import { Component } from '@angular/core';
import { NavItem } from '../shared/components/navbar/navbar.component';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
	navItems: NavItem[] = [
		{
			title: 'Details',
			routerLink: '/profile/user-details',
		},
		{
			title: 'Voice Print',
			routerLink: '/profile/voice-print',
		},
		{
			title: 'Calendar',
			routerLink: '/profile/calendar',
		},
	];

	constructor() {}
}
