import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthUserInfo } from 'src/app/models/user.model';
import { RecordedAudio } from 'src/app/shared/utilities/audio-recording';

enum StepIndexEnum {
	SETUP_ACCOUNT,
	SETUP_VOICE_PRINT,
	SYNC_CALENDER,
}
@Component({
	selector: 'app-setup-voiceprint',
	templateUrl: './setup-voiceprint.component.html',
	styleUrls: ['./setup-voiceprint.component.scss'],
})
export class SetupVoiceprintComponent {
	@Output() back = new EventEmitter();
	@Output() next = new EventEmitter();
	@Output() save = new EventEmitter<RecordedAudio>();
	@Input() currentUserInfo!: AuthUserInfo;
	@Input() currentOnboardingStep!: StepIndexEnum;
	@Input() isDisableSave!: boolean;
	stepIndexEnum = StepIndexEnum;
	showRecordedAudio = false;
	recordedAudio: RecordedAudio | undefined = undefined;
	duration = 0;
	viewState: 'record' | 'verify' = 'record';
	startRecord = false;

	constructor() {}

	handleBack() {
		this.back.emit();
	}

	handleNext() {
		this.viewState = 'verify';
	}

	saveRecording() {
		this.save.emit(this.recordedAudio);
	}

	stopRecording(data: { recordedAudio: RecordedAudio; duration: number }) {
		this.recordedAudio = data.recordedAudio;
		this.duration = data.duration;
		this.startRecord = false;
	}
	startRecording() {
		this.startRecord = true;
		this.recordedAudio = undefined;
	}
	discardAudio() {
		this.viewState = 'record';
		this.recordedAudio = undefined;
	}
}
