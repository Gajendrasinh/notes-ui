import { Component } from '@angular/core';
import { getAssetsPath } from 'src/app/shared/utilities/utility-fns';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-auth-wrapper',
	templateUrl: './auth-wrapper.component.html',
	styleUrls: ['./auth-wrapper.component.scss'],
})
export class AuthWrapperComponent {
	getAssetsPath = getAssetsPath;
	authError$ = this.authService.authErrorSubject$.asObservable();

	constructor(private authService: AuthService) {}
}
