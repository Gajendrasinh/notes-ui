/**
 * Handle multiple properties of Notification
 */
export interface AppNotification {
	/**
	 * Notification message
	 */
	text: string;
	/**
	 * Title of the notification
	 */
	corelText?: string;
	/**
	 * Type of notification
	 */
	type: 'error' | 'success' | 'warning' | 'info';
	/**
	 * Duration to show any particular notification
	 */
	duration?: number;
}
