import { Component } from '@angular/core';
import { ProfileConfig } from './../profile.config';

@Component({
	selector: 'app-user-calendar',
	templateUrl: './user-calendar.component.html',
	styleUrls: ['./user-calendar.component.scss'],
})
export class UserCalendarComponent {
	loaderId = ProfileConfig.LOADER_IDS.CALENDAR_HEADER_PANEL;
	connected: any = false;
	connectedAccounts: any[] | undefined = undefined;

	constructor() {}
	handleAccountChange(accounts: any) {
		this.connectedAccounts = accounts;
	}
}
