import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import {
	Account,
	Designation,
	OnboardingState,
	Step,
} from '../models/onboarding.model';
import { AuthUserInfo } from '../models/user.model';
import { NotificationService } from '../shared/notification/notification.service';
import { RecordedAudio } from '../shared/utilities/audio-recording';
import { OnboardingService } from './services/onboarding.service';

enum StepIndexEnum {
	SETUP_ACCOUNT,
	SETUP_VOICE_PRINT,
	SYNC_CALENDER,
}

type OnboardingDialogData = { activeStepIndex: number; state: OnboardingState };
@Component({
	selector: 'app-onboarding',
	templateUrl: './onboarding.component.html',
	styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit, OnDestroy {
	activeStepIndex: number;
	stepIndexEnum = StepIndexEnum;
	isDisableSave = false;

	steps: Step[] = [
		{
			index: StepIndexEnum.SETUP_ACCOUNT,
			title: 'Set up Account',
			inProgress: true,
			complete: false,
		},
		{
			index: StepIndexEnum.SETUP_VOICE_PRINT,
			title: 'Set up Voiceprint',
			inProgress: false,
			complete: false,
		},
		{
			index: StepIndexEnum.SYNC_CALENDER,
			title: 'Sync Calendar & Drive',
			inProgress: false,
			complete: false,
		},
	];

	state: OnboardingState = {};
	designations: Designation[] = [];
	currentUserInfo!: AuthUserInfo;
	subscriptions = new Subscription();
	currentOnboardingStep!: number;

	constructor(
		@Inject(MAT_DIALOG_DATA) data: OnboardingDialogData,
		private dialogRef: MatDialogRef<OnboardingComponent>,
		private onbaordingService: OnboardingService,
		private notificationService: NotificationService,
		private authService: AuthService
	) {
		this.activeStepIndex = StepIndexEnum.SETUP_ACCOUNT;
		if (data) {
			const { activeStepIndex, state } = data;
			this.activeStepIndex = activeStepIndex || StepIndexEnum.SETUP_ACCOUNT;
			this.currentOnboardingStep = activeStepIndex;
			this.state = { ...state };
			if (activeStepIndex) {
				this.steps.forEach((s) => {
					if (s.index < activeStepIndex) {
						s.complete = true;
						s.inProgress = true;
					}
					if (s.index === activeStepIndex) {
						s.inProgress = true;
					}
				});
			}
		}

		// this.subscriptions.add(
		//   this.onbaordingService.getDesignations().subscribe(designations => {
		//     this.designations = designations;
		//   })
		// );
	}

	ngOnInit(): void {
		this.authService.currentUserInfo().then((currentUser) => {
			this.currentUserInfo = currentUser;
		});
	}

	saveAccount(event: { account: Account; dirty: boolean }) {
		if (event.dirty) {
			this.onbaordingService.saveAccountDetails(event.account).subscribe(() => {
				this.state.account = { ...this.state.account, ...event.account };
				this.handleNext();
			});
		} else {
			this.handleNext();
		}
	}

	saveVoicePrint(voicePrint: RecordedAudio) {
		this.isDisableSave = true;
		this.onbaordingService
			.saveVoicePrint(this.currentUserInfo.email, voicePrint.audioBlob)
			.subscribe((res) => {
				this.isDisableSave = false;
				if (res.success) {
					this.notificationService.showNotification(
						'Voiceprint saved successfully',
						'success'
					);
					this.handleNext();
				}
			});
	}

	handleNext() {
		if (this.activeStepIndex < this.steps.length - 1) {
			const step = this.steps[this.activeStepIndex];
			if (step) {
				step.complete = true;
				step.inProgress = true;
			}
			this.activeStepIndex++;

			const nextStep = this.steps[this.activeStepIndex];
			nextStep.inProgress = true;
		}
	}

	handleCalendarNextStep() {
		if (this.activeStepIndex) {
			const step = this.steps[this.activeStepIndex];
			if (step) {
				step.complete = true;
				step.inProgress = true;
			}
		}
	}

	handleBack() {
		if (this.activeStepIndex > 0) {
			this.activeStepIndex--;
		}
	}

	handleSkip() {
		this.notificationService.showNotification(
			'Account setup completed successfully',
			'success'
		);
		this.dialogRef.close();
	}
	handleSyncCompleted() {
		this.notificationService.showNotification(
			'Account setup completed successfully',
			'success'
		);
		this.dialogRef.close();
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
