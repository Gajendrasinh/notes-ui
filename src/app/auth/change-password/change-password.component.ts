import { Component } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { getAssetsPath } from 'src/app/shared/utilities/utility-fns';
import { UtilityService } from 'src/app/shared/utilities/utility.service';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
	getAssetsPath = getAssetsPath;

	changePasswordForm: FormGroup;

	passwordPattern =
		'(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,16}';

	isnewPasswordShow = true;
	isCapsLockActive: boolean | undefined;
	isPasswordStrength = false;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService
	) {
		this.changePasswordForm = formBuilder.group({
			varificationCode: [
				'',
				[Validators.required, Validators.pattern('^[0-9]*$')],
			],
			newPassword: [
				'',
				[Validators.required, UtilityService.required, this.validatePassword],
			],
		});
	}

	validatePassword(control: AbstractControl) {
		const errors: any = {};
		let hasError = false;

		const value = (control.value || '') as string;
		const min1UpperLowerCaseChar = new RegExp(/(?=.*[a-z])(?=.*[A-Z])/);
		const min1SpecialChar = new RegExp(/(?=.*[-+_!@#$%^&*., ?]).+$/);

		if (value.length < 8) {
			errors['min8CharRequired'] = true;
			hasError = true;
		}
		if (!min1UpperLowerCaseChar.test(value)) {
			errors['min1UpperLowerCaseChar'] = true;
			hasError = true;
		}
		if (!min1SpecialChar.test(value)) {
			errors['min1SpecialChar'] = true;
			hasError = true;
		}
		return hasError ? errors : null;
	}

	newPasswordShow() {
		this.isnewPasswordShow = !this.isnewPasswordShow;
	}
	handleCapsLock(keyEvent: KeyboardEvent) {
		if (keyEvent.key) {
			if (keyEvent.getModifierState('CapsLock')) {
				this.isCapsLockActive = true;
			} else {
				this.isCapsLockActive = false;
			}
		}
	}
	sendNewPassword() {
		const { varificationCode, newPassword } = this.changePasswordForm.value;
		this.authService.forgotPasswordSubmit(
			(varificationCode as string).toString(),
			newPassword
		);
	}

	showPasswordStrength() {
		this.isPasswordStrength = true;
	}
}
