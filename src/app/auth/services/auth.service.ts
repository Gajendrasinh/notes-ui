import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response.model';
import { AuthUserInfo } from 'src/app/models/user.model';
import { ApiConstants } from 'src/app/shared/constants/api-urls';
import { NotificationService } from 'src/app/shared/notification/notification.service';

const AUTH_COOKIE = 'Do-Sec-Token';

type MatchThreePassword = ApiResponse<{ passwordAlreadyExists: boolean }>;
type SaveNewPassword = ApiResponse<{ passwordSaved: boolean }>;
type UserIdentityProvider = ApiResponse<{
	firstName: string;
	identityProvider: string;
	lastName: string;
}>;

type SignUpInfo = {
	username: string;
	password: string;
	attributes: {
		given_name: string;
		family_name: string;
		'custom:registration_token': string;
	};
};

type SignUpAPI = {
	emailId: string;
	familyName: string;
	givenName: string;
	registrationToken?: string;
	identityProvider: string;
};

type ActionLink = { title: string; handler: (data?: any) => void };
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	authErrorSubject$ = new Subject<{
		header: string;
		message: string;
		action?: ActionLink;
	}>();

	private authStateSubject: Subject<CognitoUser | any> = new Subject<
		CognitoUser | any
	>();
	authState$: Observable<CognitoUser | any> =
		this.authStateSubject.asObservable();
	public static SIGN_IN = 'signIn';
	public static SIGN_OUT = 'signOut';
	private redirectUrl: string = ''; // google redirect URL
	registrationToken: string | undefined; //custom_registration_token
	signUpUserDetails = {
		emailId: '',
		familyName: '',
		givenName: '',
		registrationToken: '',
		identityProvider: '',
	};
	signUpForFederatedLoginUser: SignUpInfo = {
		username: '',
		password: '',
		attributes: {
			family_name: '',
			given_name: '',
			'custom:registration_token': '',
		},
	};
	_isLogoutListenerRegistered = false;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		@Inject(DOCUMENT) private document: Document,
		private notificationService: NotificationService,
		private cookieService: CookieService,
		private httpClient: HttpClient
	) {
		Hub.listen('auth', (data) => {
			const { channel, payload } = data;
			if (channel === 'auth') {
				const userData = payload.data?.signInUserSession?.idToken?.payload;
				this.authStateSubject.next(payload.event);
				if (payload.event === 'signIn') {
					/* assigned value to signUpUserDetails */
					this.signUpUserDetails.emailId = userData.email;
					this.signUpUserDetails.familyName = userData.family_name;
					this.signUpUserDetails.givenName = userData.given_name;
					this.signUpUserDetails.identityProvider = 'Cognito';
				}
				if (payload.event === 'customOAuthState') {
					if (payload.data) {
						this.signUpUserDetails.identityProvider = 'Google';
						if (payload.data == 'null') {
							this.signUpUserDetails.registrationToken = '';
						} else {
							this.signUpUserDetails.registrationToken = payload.data;
						}
						this.postUserSignUpDetails(this.signUpUserDetails).subscribe(
							() => {}
						);
						this.fetchLastSignInTime().subscribe();
					}
				}
			}
		});
	}

	handleSessionVerification = () => {
		Auth.currentSession().catch(() => {
			this.signOutRedirect(this.router.url);
			this.removeLogoutListener();
		});
	};

	registerLogoutListener() {
		if (!this._isLogoutListenerRegistered) {
			this.document.addEventListener(
				'visibilitychange',
				this.handleSessionVerification
			);
			this._isLogoutListenerRegistered = true;
		}
	}

	removeLogoutListener() {
		this.document.removeEventListener(
			'visibilitychange',
			this.handleSessionVerification
		);
		this._isLogoutListenerRegistered = false;
	}

	checkUserAuthenticated() {
		return Auth.currentAuthenticatedUser()
			.then((userParams) => {
				if (userParams) {
					this.authorizedRedirect();
				}
				return userParams;
			})
			.catch(() => {
				return Promise.reject('Unauthorized User');
			});
	}

	signOut() {
		Auth.signOut().then(() => {
			this.removeAuthCookie();
			this.removeLogoutListener();
			this.signOutRedirect();
		});
	}

	signOutRedirect(redirectTo?: string) {
		const queryParams = redirectTo ? { redirectTo } : {};
		this.router.navigate(['/login'], { queryParams });
	}

	authorizedRedirect() {
		const redirectTo =
			this.activatedRoute.snapshot.queryParamMap.get('redirectTo') ||
			this.redirectUrl;
		if (redirectTo) {
			this.router.navigate([redirectTo]);
			this.redirectUrl = '';
		}
		if (!redirectTo) {
			this.router.navigate(['/recordings']);
		}
	}

	/* call signin API for fetch last signin time */
	fetchLastSignInTime() {
		return this.httpClient.get(ApiConstants.FETCH_LAST_SIGN_IN);
	}

	/* signUp API for pass user Details and registration_token */
	postUserSignUpDetails(authInfo: SignUpAPI) {
		return this.httpClient.post<SignUpAPI>(ApiConstants.USER_SIGN_UP, authInfo);
	}

	async signIn(authInfo: { username: string; password: string }) {
		try {
			return Auth.signIn(authInfo)
				.then((user) => {
					this.authorizedRedirect();
					this.fetchLastSignInTime().subscribe();
					return user;
				})
				.catch((err) => {
					let message = err.message;
					let action: ActionLink | undefined;
					switch (err.message) {
						case 'Incorrect username or password.':
							message = 'Incorrect E-mail or Password';
							action = {
								title: 'Forgot password?',
								handler: () => {
									this.router.navigate(['/forgot-password']);
								},
							};
							break;
						case 'Password attempts exceeded':
							message = 'Password attempts exceeded';
							action = {
								title: 'Forgot password?',
								handler: () => {
									this.router.navigate(['/forgot-password']);
								},
							};
							break;
						case err.message:
							message = err.message;
							break;
					}
					this.authErrorSubject$.next({
						header: 'Login Failed!',
						message: message,
						action,
					});
					throw new Error(err);
				});
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async signUp(authInfo: SignUpInfo) {
		return Auth.signUp(authInfo)
			.then(() => {
				this.signUpUserDetails.emailId = authInfo.username;
				this.signUpUserDetails.familyName = authInfo.attributes.family_name;
				this.signUpUserDetails.givenName = authInfo.attributes.given_name;
				this.signUpUserDetails.identityProvider = 'Cognito';
				if (!authInfo.attributes['custom:registration_token']) {
					this.signUpUserDetails.registrationToken = '';
				} else {
					this.signUpUserDetails.registrationToken =
						authInfo.attributes['custom:registration_token'];
				}
				/* call signup api for post user details with registration token */
				this.postUserSignUpDetails(this.signUpUserDetails).subscribe();
				this.signIn({
					username: authInfo.username,
					password: authInfo.password,
				});
			})
			.catch((err) => {
				let messages = err.message;
				switch (err.code) {
					case 'UserLambdaValidationException':
						messages = 'Please use your work e-mail address to signup.';
						break;
					case 'UsernameExistsException':
						messages = 'Work e-mail address is already registered.';
						break;

					default:
						messages;
						break;
				}
				this.authErrorSubject$.next({
					header: 'Sign Up Failed!',
					message: messages,
				});
				throw new Error(err);
			});
	}

	authForgotPassword(username: string) {
		Auth.forgotPassword(username)
			.then(() => {
				sessionStorage.setItem('userName', username);
				this.router.navigate(['/change-password']);
				this.notificationService.showNotification(
					'Verification code sent successfully.',
					'success',
					10000
				);
			})
			.catch((err) => {
				let messages = err.message;
				switch (err.code) {
					case 'UserNotFoundException':
						messages = 'E-mail address is not registered.';
						break;
					case 'LimitExceededException':
						messages = 'Too many attempts. Please try after 15 minutes.';
						break;

					default:
						messages;
						break;
				}
				this.authErrorSubject$.next({ header: '', message: messages });
				throw new Error();
			});
	}

	/* Fetch User Identity Provider */
	fetchUserIdentityProvider(username: string) {
		return this.httpClient.get<UserIdentityProvider>(
			ApiConstants.GET_USER_IDENTITY_PROVIDER(username)
		);
	}

	/* forgot password function called from forgot-password-page */
	async forgotPassword(username: string) {
		this.fetchUserIdentityProvider(username).subscribe((res) => {
			const { data, status } = res;

			if (data) {
				/* value initialized for force signup if user federeted login and apply forgot password */
				this.signUpForFederatedLoginUser.username = username;
				this.signUpForFederatedLoginUser.password = 'P@ssw0rd';
				this.signUpForFederatedLoginUser.attributes.family_name =
					data?.lastName;
				this.signUpForFederatedLoginUser.attributes.given_name =
					data?.firstName;
				this.signUpForFederatedLoginUser.attributes[
					'custom:registration_token'
				] = '';

				/* value initialized for signup API if user federeted login and apply forgot password */
				this.signUpUserDetails.emailId = username;
				this.signUpUserDetails.familyName = data.lastName;
				this.signUpUserDetails.givenName = data.firstName;
				this.signUpUserDetails.registrationToken = '';
				this.signUpUserDetails.identityProvider = 'Cognito';

				if (data.identityProvider === 'Google') {
					/* Signup if user forgot password with federated login */
					Auth.signUp(this.signUpForFederatedLoginUser)
						.then(() => {
							this.postUserSignUpDetails(this.signUpUserDetails).subscribe(
								() => {},
								() => {}
							);
							this.authForgotPassword(username);
						})
						.catch((err) => {
							const messages = err.message;
							this.authErrorSubject$.next({ header: '', message: messages });
						});
				} else {
					this.authForgotPassword(username);
				}
			} else {
				const messages = status.description;
				this.authErrorSubject$.next({ header: '', message: messages });
			}
		});
	}

	matchLastThreePassword(username: string, newPassword: string) {
		return this.httpClient.post<MatchThreePassword>(
			ApiConstants.MATCH_LAST_THREE_PASSWORD,
			{ emailAddress: username, password: newPassword }
		);
	}
	saveNewPasswordInDataBase(username: string, newPassword: string) {
		return this.httpClient.post<SaveNewPassword>(
			ApiConstants.SAVE_NEW_PASSWORD,
			{ emailAddress: username, password: newPassword }
		);
	}

	forgotPasswordSubmit(varificationCode: string, newPassword: string) {
		const username = sessionStorage.getItem('userName');
		if (!username) {
			return;
		}
		/* trigger API for save check last three password in Database */
		this.matchLastThreePassword(username, newPassword).subscribe((response) => {
			const { data, status } = response;
			if (!data || data.passwordAlreadyExists) {
				const messages = status.description;
				this.authErrorSubject$.next({ header: '', message: messages });
			} else {
				if (!username) {
					return;
				}
				Auth.forgotPasswordSubmit(username, varificationCode, newPassword)
					.then(() => {
						if (!username) {
							return;
						}
						/* trigger API for save new password in Database */
						this.saveNewPasswordInDataBase(username, newPassword).subscribe(
							(response) => {
								if (response.data.passwordSaved === true) {
									this.router.navigate(['/login']);
									this.notificationService.showNotification(
										'Password reset successfully.',
										'success',
										10000
									);
								}
							}
						);
					})
					.catch((err) => {
						let messages = err.message;
						let action: ActionLink | undefined;
						switch (err.code) {
							case 'CodeMismatchException':
								messages =
									'Invalid verification code. Please generate code again.';
								action = {
									title: 'Resend',
									handler: () => {
										if (username) {
											this.forgotPassword(username);
										}
									},
								};
								break;
							case 'ExpiredCodeException':
								messages =
									'Invalid verification code. Please generate code again.';
								action = {
									title: 'Resend',
									handler: () => {
										if (username) {
											this.forgotPassword(username);
										}
									},
								};
								break;

							default:
								messages;
								break;
						}
						this.authErrorSubject$.next({
							header: '',
							message: messages,
							action,
						});
					});
			}
		});
	}

	getRegistrationToken(token: string) {
		if (token) {
			this.registrationToken = token;
		} else {
			this.registrationToken = 'null';
		}
	}
	signInGoogle() {
		Auth.federatedSignIn({
			provider: CognitoHostedUIIdentityProvider.Google,
			customState: this.registrationToken,
		})
			.then(() => {})
			.catch(() => {});
	}

	signInGoogleFailedError(messages: string) {
		/* Added small delay so that component is get rendered properly. */
		setTimeout(() => {
			this.authErrorSubject$.next({ header: '', message: messages });
		}, 200);
	}

	currentSession() {
		return Auth.currentSession();
	}

	currentUserInfo(): Promise<AuthUserInfo> {
		return Auth.currentUserInfo().then((response) => response.attributes);
	}

	updateAuthCookie(path: string) {
		return this.currentSession().then((response) => {
			const token = response.getIdToken().getJwtToken();
			this.cookieService.set(AUTH_COOKIE, token, {
				domain: '.dataorb.ai',
				path: path || '/',
				sameSite: 'None',
				secure: true,
			});
			return token;
		});
	}

	removeAuthCookie() {
		this.cookieService.delete(AUTH_COOKIE, '/', '.dataorb.ai');
	}

	getUserDetails() {
		const getUser = Auth.currentSession().then(
			(res) => res.getIdToken().payload
		);
		return getUser.then((t) => {
			const email: string = t.email;
			const firstName: string = t.given_name;
			const lastName: string = t.family_name;
			return { email, firstName, lastName };
		});
	}
}
