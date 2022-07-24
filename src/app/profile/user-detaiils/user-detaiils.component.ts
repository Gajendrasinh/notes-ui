import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UtilityService } from 'src/app/shared/utilities/utility.service';
import { ProfileConfig } from './../profile.config';
import { selectProfileDetails } from './../store';
import * as profileDetailsActions from './../store/profile-details.actions';

type UserDetails = {
	email: string;
	firstName: string;
	lastName: string;
	reportingTo: string;
};

@Component({
	selector: 'app-user-detaiils',
	templateUrl: './user-detaiils.component.html',
	styleUrls: ['./user-detaiils.component.scss'],
})
export class UserDetaiilsComponent implements OnInit {
	loaderId = ProfileConfig.LOADER_IDS.PROFILE_DETAIL_HEADER_PANEL;
	userDetails: UserDetails | undefined;
	userDetailsForm: FormGroup;

	subscriptions = new Subscription();

	constructor(private formBuilder: FormBuilder, private store: Store) {
		this.userDetailsForm = formBuilder.group({
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
			email: [
				'',
				[Validators.required, Validators.email, UtilityService.required],
			],
			reportingTo: [''],
		});
	}

	ngOnInit(): void {
		this.subscriptions.add(
			this.store.dispatch(profileDetailsActions.getProfileDetails())
		);

		this.store.select(selectProfileDetails).subscribe((user: any) => {
			if (user !== undefined) {
				//  this.userDetailsForm.patchValue(user);
				this.userDetailsForm.get('firstName')?.patchValue(user.givenName);
				this.userDetailsForm.get('firstName')?.disable();
				this.userDetailsForm.get('lastName')?.patchValue(user.familyName);
				this.userDetailsForm.get('lastName')?.disable();
				this.userDetailsForm.get('email')?.patchValue(user.emailId);
				this.userDetailsForm.get('email')?.disable();
				this.userDetailsForm.get('reportingTo')?.disable();
			}
		});
	}
}
