import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OnboardingDialogService } from '../onboarding/services/onboarding-dialog.service';
import { OnboardingService } from '../onboarding/services/onboarding.service';
import { NavItem } from '../shared/components/navbar/navbar.component';

@Component({
	selector: 'app-recordings',
	templateUrl: './recordings.component.html',
	styleUrls: ['./recordings.component.scss'],
})
export class RecordingsComponent implements OnInit {
	navItems: NavItem[] = [
		{
			title: 'Recordings',
			routerLink: '/recordings',
			svgIcon: 'audio_wave',
		},
	];

	onboardingCompleted = false;

	subscriptions: Subscription = new Subscription();

	constructor(
		private obDialogService: OnboardingDialogService,
		private obService: OnboardingService
	) {}

	ngOnInit(): void {
		this.openOnboardingDialog();
	}

	openOnboardingDialog() {
		this.subscriptions.add(
			this.obService.getRegistrationDetails().subscribe((obStatus) => {
				if (obStatus?.onboarded) {
					this.onboardingCompleted = true;
				} else {
					const dialogRef = this.obDialogService.open({
						activeStepIndex: obStatus?.onBoardingStep,
						state: { account: obStatus },
					});
					dialogRef.afterClosed().subscribe(() => {
						this.onboardingCompleted = true;
					});
				}
			})
		);
	}
}
