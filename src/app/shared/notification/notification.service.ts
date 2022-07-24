import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AppNotification } from './model/AppNotification';
import { NotificationComponent } from './notification/notification.component';

/**
 * Service to show notification in the app
 */
@Injectable({
	providedIn: 'root',
})
export class NotificationService {
	/**
	 * Function will be called on the creation of the service
	 * @param _snackBar
	 */
	constructor(private _snackBar: MatSnackBar) {}

	/**
	 * Show the notification in the component and set the configuration for the Notification
	 * @param notification
	 */
	pushNotification(notification: AppNotification) {
		const config: MatSnackBarConfig = {
			data: notification,
			duration: notification.duration || 4000,
			horizontalPosition: 'start',
			verticalPosition: 'bottom',
		};

		this._snackBar.openFromComponent(NotificationComponent, config);
	}

	/**
	 * Show notification in the application
	 * @param message
	 * @param type
	 */
	showNotification(
		message: string,
		type: 'error' | 'success' | 'warning' | 'info',
		duration?: number
	) {
		this.pushNotification({
			text: message,
			type,
			duration,
		});
	}
}
