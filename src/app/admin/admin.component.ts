import { Component } from '@angular/core';
import { NavItem } from '../shared/components/navbar/navbar.component';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
	navItems: NavItem[] = [
		{
			title: 'Account',
			routerLink: '/admin/account-details',
		},
		{
			title: 'Bot Settings',
			routerLink: '/admin/bot-settings',
		},
		{
			title: 'Users and Roles',
			routerLink: '/admin/users-and-roles',
		},
		{
			title: 'Themes and Topics',
			routerLink: '/admin/themes-and-topics',
		},
	];
	constructor() {}
}
