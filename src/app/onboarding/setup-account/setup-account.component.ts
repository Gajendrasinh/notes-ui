import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account, Designation } from 'src/app/models/onboarding.model';
import { REGEX_CONFIG } from 'src/app/shared/constants/regex.config';
import { trimObjectKeys } from 'src/app/shared/utilities/utility-fns';
import { UtilityService } from 'src/app/shared/utilities/utility.service';

@Component({
	selector: 'app-setup-account',
	templateUrl: './setup-account.component.html',
	styleUrls: ['./setup-account.component.scss'],
})
export class SetupAccountComponent implements OnInit {
	@Input() account: Account | undefined;
	@Input() designations!: Designation[];

	WEBSITE_REGEX =
		/^(http(s)?:\/\/.)?(www\.)?(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,5})$/;

	@Output() next = new EventEmitter<{ account: Account; dirty: boolean }>();

	accountSetupForm: FormGroup;

	filteredDesignations: Designation[] = [];
	designationDisplayWith = (id: number) =>
		this.filteredDesignations.find((d) => d.id === id)?.displayName || '';
	designationAutoCompleteHeight = '';
	designationsLoaded = false;

	constructor(private formBuilder: FormBuilder) {
		this.accountSetupForm = formBuilder.group({
			organizationName: [
				'',
				[
					Validators.required,
					UtilityService.required,
					Validators.pattern(REGEX_CONFIG.SPECIAL_CHARACTER),
				],
			],
			website: [
				'',
				[Validators.required, Validators.pattern(this.WEBSITE_REGEX)],
			],
			designation: [
				'',
				[
					Validators.required,
					UtilityService.required,
					Validators.pattern(REGEX_CONFIG.SPECIAL_CHARACTER),
				],
			],
		});
	}

	ngOnInit(): void {
		if (this.account) {
			this.accountSetupForm.patchValue(this.account);

			if (this.account.invitedUser) {
				this.accountSetupForm.get('organizationName')?.disable();
				this.accountSetupForm.get('website')?.disable();
			}
		}
	}

	handleNext() {
		const account: any = trimObjectKeys(this.accountSetupForm.getRawValue());
		const dirty = this.accountSetupForm.dirty;
		this.next.emit({ account, dirty });
	}
}
