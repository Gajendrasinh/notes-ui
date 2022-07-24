import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateSpeakerConfirmComponent } from './update-speaker-confirm/update-speaker-confirm.component';
import { UpdateSpeakerNameComponent } from './update-speaker-name/update-speaker-name.component';

@Injectable({
	providedIn: 'root',
})
export class RdDialogsService {
	constructor(private dialog: MatDialog) {}

	showUpdateSpeakerConfirmation() {
		return this.dialog.open(UpdateSpeakerConfirmComponent, {
			autoFocus: false,
		});
	}

	showUpdateSpeakerNameDialog() {
		return this.dialog.open(UpdateSpeakerNameComponent, { autoFocus: false });
	}
}
