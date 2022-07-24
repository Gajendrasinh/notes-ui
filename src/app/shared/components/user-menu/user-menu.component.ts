import { Component, Input, OnInit } from '@angular/core';
import Auth from '@aws-amplify/auth';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthUserInfo } from 'src/app/models/user.model';

@Component({
	selector: 'shared-user-menu',
	templateUrl: './user-menu.component.html',
	styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
	@Input() authUserInfo?: AuthUserInfo;
	userAvtarBgColor = '#0492F6';
	displayName = '';

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		Auth.currentUserInfo().then((userInfo) => {
			this.authUserInfo = userInfo.attributes;
			this.displayName =
				this.authUserInfo?.given_name + ' ' + this.authUserInfo?.family_name;
		});
	}

	signOut() {
		this.authService.signOut();
	}
}
