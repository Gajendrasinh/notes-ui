import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OnboardingState } from 'src/app/models/onboarding.model';
import { OnboardingComponent } from '../onboarding.component';

@Injectable({
	providedIn: 'root',
})
export class OnboardingDialogService {
	constructor(private dialog: MatDialog) {}

	open(data?: { activeStepIndex?: number; state?: OnboardingState }) {
		return this.dialog.open(OnboardingComponent, {
			panelClass: 'onboarding-popup',
			data,
			disableClose: true,
		});
	}
}
