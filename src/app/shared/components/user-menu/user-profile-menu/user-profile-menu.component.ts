import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Auth } from 'aws-amplify';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthUserInfo } from 'src/app/models/user.model';
import { resetEventListState } from 'src/app/recordings/store/recording.actions';

type UserDetails = {
	email: string;
	firstName: string;
	lastName: string;
};
@Component({
	selector: 'app-user-profile-menu',
	templateUrl: './user-profile-menu.component.html',
	styleUrls: ['./user-profile-menu.component.scss'],
})
export class UserProfileMenuComponent implements OnInit {
	@Input() authUserInfo!: AuthUserInfo;
	userAvtarBgColor = '#0492F6';
	displayName = '';
	userDetails: UserDetails | undefined;
	activeProfileRoute = false;
	constructor(
		private authService: AuthService,
		private store: Store,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {
		authService.getUserDetails().then((res) => {
			this.userDetails = res;
		});
	}

	ngOnInit(): void {
		Auth.currentUserInfo().then((userInfo) => {
			this.authUserInfo = userInfo.attributes;
			this.displayName =
				this.authUserInfo?.given_name + ' ' + this.authUserInfo?.family_name;
		});

		if (this.router.url.match('profile')) {
			this.activeProfileRoute = true;
		} else {
			this.activeProfileRoute = false;
		}
	}

	signOut() {
		this.store.dispatch(resetEventListState());
		this.authService.signOut();
	}
}
