import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { AppNotification } from '../model/AppNotification';

/**
 * Component to show notification in the app
 */
@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
	/**
	 * Stores the notification model of the component
	 */
	notification: AppNotification;
	/**
	 * Stores the constants of the app
	 */
	appConstants: any;

	/**
	 * Function will be called on the creation of the component
	 * @param _notification
	 */
	constructor(
		@Inject(MAT_SNACK_BAR_DATA) private _notification: AppNotification
	) {
		this.notification = _notification;
	}
}
