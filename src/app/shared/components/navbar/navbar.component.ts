import { Component, Input } from '@angular/core';

export interface NavItem {
	title: string;
	routerLink: string;
	svgIcon?: string;
	matIcon?: string;
}

@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
	@Input() navItems: NavItem[] = [];

	constructor() {}
}
