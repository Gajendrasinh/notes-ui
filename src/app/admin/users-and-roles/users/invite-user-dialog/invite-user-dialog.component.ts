import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormArray,
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
	InvitedUser,
	InvitedUserError,
} from 'src/app/models/invited-user-details.model';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { AdminService } from '../../../services/admin.service';

@Component({
	selector: 'app-invite-user-dialog',
	templateUrl: './invite-user-dialog.component.html',
	styleUrls: ['./invite-user-dialog.component.scss'],
})
export class InviteUserDialogComponent implements OnInit {
	inviteUserForm: FormGroup;
	inviteUserErrorsResponse: InvitedUserError[] = [];
	isInviteButtonDisable = false;
	constructor(
		public dialogRef: MatDialogRef<InviteUserDialogComponent>,
		private changeDetectorRef: ChangeDetectorRef,
		private notificationService: NotificationService,
		private adminService: AdminService,
		private formBuilder: FormBuilder
	) {
		this.inviteUserForm = formBuilder.group({
			invitedUserInfo: formBuilder.array([]),
		});
	}

	ngOnInit(): void {
		this.addMoreFormField(5);
	}

	get inviteUserFormArray() {
		return this.inviteUserForm.get('invitedUserInfo') as FormArray;
	}

	addMoreFormField(count: number) {
		for (let index = 0; index < count; index++) {
			this.addNewAddressGroup();
		}
	}

	addNewAddressGroup() {
		this.inviteUserFormArray.push(
			this.formBuilder.group(
				{
					emailId: [
						'',
						[Validators.email, this.validateEmailIdInSystem.bind(this)],
					],
					role: [''],
				},
				{ validators: [this.comparisonValidator] }
			)
		);
	}

	validateEmailIdInSystem(control: AbstractControl) {
		if (
			this.inviteUserErrorsResponse &&
			this.inviteUserErrorsResponse?.length
		) {
			const errorExist = this.inviteUserErrorsResponse.find(
				(e) => e.emailId === control.value
			);
			if (errorExist) {
				return {
					systemError: errorExist.description,
				};
			}
			return null;
		}
		return null;
	}

	comparisonValidator(formControl: AbstractControl) {
		// return (formControl: AbstractControl): ValidationErrors => {
		const emailId = formControl.get('emailId');
		const role = formControl.get('role');
		if ((!emailId?.value && !role?.value) || (emailId?.value && role?.value)) {
			emailId?.hasError('required') && emailId?.setErrors(null);
			role?.hasError('required') && role?.setErrors(null);
			return null;
		} else if (emailId?.value && !role?.value) {
			role?.setErrors({ required: true });
		} else {
			emailId?.setErrors({ required: true });
		}
		return null;
		// };
	}

	closeInvitedUserDialog(reload?: boolean): void {
		this.dialogRef.close({ reload });
	}

	inviteUsers() {
		if (!this.isInviteButtonDisable) {
			this.isInviteButtonDisable = true;
			if (this.inviteUserForm.invalid) {
				this.isInviteButtonDisable = false;
				return;
			}

			const formData: InvitedUser[] = this.inviteUserForm.value.invitedUserInfo;
			const filteredFormData = formData.filter((filledData) => {
				return filledData.emailId && filledData.role;
			});

			this.adminService.saveInvitedUsers(filteredFormData).subscribe((res) => {
				this.isInviteButtonDisable = false;
				if (!res?.length) {
					this.closeInvitedUserDialog(true);
					this.notificationService.showNotification(
						'Invitation(s) sent successfully.',
						'success',
						10000
					);
				}
				this.inviteUserErrorsResponse = res;
				this.inviteUserFormArray.controls.forEach((c) => {
					c.setValue({ ...c.value });
				});
			});
		}
	}

	validInvites() {
		return this.inviteUserFormArray.controls.filter(
			(c) => !c.errors && c.value.emailId
		);
	}
	emailBlurValidation(index: number) {
		const inviteUserFormGroup = this.inviteUserFormArray.get(`${index}`);
		if (!inviteUserFormGroup?.get('emailId')?.value) {
			inviteUserFormGroup?.get('role')?.reset();
		}
	}
}
