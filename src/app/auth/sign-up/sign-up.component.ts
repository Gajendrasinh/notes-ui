import { Component } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getAssetsPath } from 'src/app/shared/utilities/utility-fns';
import { UtilityService } from 'src/app/shared/utilities/utility.service';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
	getAssetsPath = getAssetsPath;
	signUpForm: FormGroup;
	isPasswordShow: boolean = true;
	isCapsLockActive: boolean | undefined;
	isDisableSignUp: boolean = false;
	isPasswordStrength: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private activatedRoute: ActivatedRoute
	) {
		this.signUpForm = formBuilder.group({
			firstName: [
				'',
				[
					Validators.maxLength(35),
					Validators.required,
					UtilityService.required,
				],
			],
			lastName: [
				'',
				[
					Validators.maxLength(35),
					Validators.required,
					UtilityService.required,
				],
			],
			username: [
				'',
				[Validators.required, Validators.email, UtilityService.required],
			],
			password: [
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
		const min1SpecialChar = new RegExp(/(?=.*[.!@#$%^&*\-_=+?]).+$/);
		const restrictedSpecialChar = new RegExp(/^[a-zA-Z0-9.!@#$%^&*\-_=+?]+$/);

		if (value.length < 8) {
			errors['min8CharRequired'] = true;
			hasError = true;
		}
		if (!min1UpperLowerCaseChar.test(value)) {
			errors['min1UpperLowerCaseChar'] = true;
			hasError = true;
		}
		if (!min1SpecialChar.test(value) || !restrictedSpecialChar.test(value)) {
			errors['min1SpecialChar'] = true;
			hasError = true;
		}
		return hasError ? errors : null;
	}

	passwordShow() {
		this.isPasswordShow = !this.isPasswordShow;
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
	registrationTokenPost() {
		this.authService.getRegistrationToken(
			this.activatedRoute.snapshot.params.id
		);
	}
	signInToGoogle() {
		this.authService.signInGoogle();
	}
	singUpToAWS() {
		if (!this.isDisableSignUp) {
			this.isDisableSignUp = true;
			const registration_token = this.activatedRoute.snapshot.params.id;
			const { username, password, firstName, lastName } = this.signUpForm.value;
			this.authService
				.signUp({
					username: username,
					password: password,
					attributes: {
						given_name: firstName,
						family_name: lastName,
						'custom:registration_token': registration_token,
					},
				})
				.then(() => {
					this.isDisableSignUp = false;
				})
				.catch(() => {
					this.isDisableSignUp = false;
				});
		}
	}

	showPasswordStrength() {
		this.isPasswordStrength = true;
	}
}
