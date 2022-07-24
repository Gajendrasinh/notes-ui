import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/models/onboarding.model';
import { UtilityService } from 'src/app/shared/utilities/utility.service';

@Component({
	selector: 'app-account-details',
	templateUrl: './account-details.component.html',
	styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit {
	@Input() account: Account | undefined;
	accountDetailsForm: FormGroup;
	WEBSITE_REGEX =
		/^(http(s)?:\/\/.)?(www\.)?(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,5})$/;
	ORGANIZATION_REGEX = /^[a-zA-Z0-9., .-]+$/;

	constructor(private formBuilder: FormBuilder) {
		this.accountDetailsForm = formBuilder.group({
			organizationName: [
				'',
				[
					Validators.required,
					UtilityService.required,
					Validators.pattern(this.ORGANIZATION_REGEX),
				],
			],
			website: [
				'',
				[
					Validators.required,
					UtilityService.required,
					Validators.pattern(this.WEBSITE_REGEX),
				],
			],
			designation: ['', { validators: [Validators.required] }],
			createdBy: ['', [Validators.required, UtilityService.required]],
			accountEmail: ['', [Validators.required, UtilityService.required]],
		});
	}

	ngOnInit(): void {
		if (this.account) {
			this.accountDetailsForm.patchValue(this.account);
			this.accountDetailsForm.get('organizationName')?.disable();
			this.accountDetailsForm.get('website')?.disable();
			this.accountDetailsForm.get('createdBy')?.disable();
			this.accountDetailsForm.get('accountEmail')?.disable();
		}
	}
}
