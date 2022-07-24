import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getAssetsPath } from 'src/app/shared/utilities/utility-fns';
import { UtilityService } from 'src/app/shared/utilities/utility.service';
import { AuthService } from '../services/auth.service';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	getAssetsPath = getAssetsPath;
	loginForm: FormGroup;
	logInFormData: any = [];
	isPasswordShow = true;
	isCapsLockActive: boolean | undefined;
	isDisableLogin = false;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private activatedRoute: ActivatedRoute
	) {
		this.loginForm = formBuilder.group({
			username: [
				'',
				[Validators.required, Validators.email, UtilityService.required],
			],
			password: [
				'',
				[Validators.required, Validators.minLength(8), UtilityService.required],
			],
		});
	}

	ngOnInit(): void {
		let error_msg =
			this.activatedRoute.snapshot.queryParamMap.get('error_description');
		if (error_msg) {
			error_msg = 'Please use your work e-mail address to signup.';
			this.authService.signInGoogleFailedError(error_msg);
		}
	}

	togglePassword() {
		this.isPasswordShow = !this.isPasswordShow;
	}
	registrationTokenPost() {
		this.authService.getRegistrationToken(
			this.activatedRoute.snapshot.params.id
		);
	}
	signInToAWS() {
		if (!this.isDisableLogin) {
			this.isDisableLogin = true;
			this.authService
				.signIn(this.loginForm.value)
				.then(() => {
					this.isDisableLogin = false;
				})
				.catch(() => {
					this.isDisableLogin = false;
				});
		}
	}

	signInToGoogle() {
		this.authService.signInGoogle();
	}

	handleCapsLock(keyEvent: KeyboardEvent) {
		if (keyEvent.key) {
			if (keyEvent.getModifierState('CapsLock')) {
				this.isCapsLockActive = true;
			} else {
				this.isCapsLockActive = false;
			}
		}
	}
}
