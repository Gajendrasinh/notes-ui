import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { getAssetsPath } from 'src/app/shared/utilities/utility-fns';
import { UtilityService } from 'src/app/shared/utilities/utility.service';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
	getAssetsPath = getAssetsPath;
	regEmail: FormControl;
	isDisableReset = false;

	constructor(private authService: AuthService) {
		this.regEmail = new FormControl('', [
			Validators.required,
			Validators.email,
			UtilityService.required,
		]);
	}

	sendForgotPasswordMail() {
		this.isDisableReset = true;
		this.authService
			.forgotPassword(this.regEmail.value)
			.then(() => {
				this.isDisableReset = false;
			})
			.catch(() => {
				this.isDisableReset = false;
			});
	}
}
