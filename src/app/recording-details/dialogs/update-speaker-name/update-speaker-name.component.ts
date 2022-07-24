import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from 'src/app/shared/utilities/utility.service';

@Component({
	selector: 'app-update-speaker-name',
	templateUrl: './update-speaker-name.component.html',
	styleUrls: ['./update-speaker-name.component.scss'],
})
export class UpdateSpeakerNameComponent {
	speakerFormGroup: FormGroup;

	constructor(private dialogRef: MatDialogRef<UpdateSpeakerNameComponent>) {
		this.speakerFormGroup = new FormGroup({
			firstName: new FormControl('', [UtilityService.required]),
			lastName: new FormControl('', [UtilityService.required]),
		});
	}

	handleUpdate() {
		if (this.speakerFormGroup.valid) {
			const { firstName, lastName } = this.speakerFormGroup.value;
			this.dialogRef.close(`${firstName} ${lastName}`);
		}
	}
}
