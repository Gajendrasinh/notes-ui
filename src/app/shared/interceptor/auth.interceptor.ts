import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AppNotification } from '../notification/model/AppNotification';
import { NotificationService } from '../notification/notification.service';

const EXCLUDE_ACCESS_TOKEN_URLS = [
	'/user/check-password',
	'/user/save-password',
	'/user/sign-up',
	'/user/identity-provider',
];
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private notificationService: NotificationService,
		private authService: AuthService
	) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		const excludeAccessTokenRequest = EXCLUDE_ACCESS_TOKEN_URLS.some((u) =>
			request.url.includes(u)
		);

		if (excludeAccessTokenRequest) {
			return next.handle(request).pipe(catchError(this.handleError));
		} else {
			return from(this.authService.currentSession()).pipe(
				switchMap((session) => {
					const jwt = session.getIdToken().getJwtToken();
					const withAuthRequest = request.clone({
						setHeaders: {
							Authorization: `Bearer ${jwt}`,
						},
					});

					return next.handle(withAuthRequest);
				}),
				/*         tap(response => {

          // Global Error handling for error from backend API
          if (response instanceof HttpResponse) {
            if (response.status === 200) {
              let apiResponseStatus = response.body?.status;

              if (apiResponseStatus && apiResponseStatus.statusCode !== 200 && apiResponseStatus?.description) {
                this.showNotification({ text: apiResponseStatus.description, type: 'error' });
              }
            }
          }
        }), */
				catchError(this.handleError.bind(this))
			);
		}
	}

	handleError(err: any) {
		if (err instanceof HttpErrorResponse) {
			switch (err.status) {
				case 0:
					this.showNotification({
						text: 'Something went wrong. Please try again later',
						type: 'warning',
					});
					break;

				case 400:
					this.showNotification({
						text: err?.error?.header?.message,
						type: 'warning',
					});
					break;

				case 401:
					this.authService.signOut();
					break;

				case 500:
					this.showNotification({
						text: 'Internal Server Error',
						type: 'error',
					});
					break;
				default:
					return throwError(err.error);
			}
		}
		return throwError(err.error);
	}

	showNotification(notification: AppNotification) {
		this.notificationService.pushNotification(notification);
	}
}
