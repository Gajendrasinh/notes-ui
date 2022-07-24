import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding.component';
import { OnboardingSidePanelComponent } from './onboarding-side-panel/onboarding-side-panel.component';
import { StepComponent } from './onboarding-side-panel/step/step.component';
import { SetupAccountComponent } from './setup-account/setup-account.component';
import { SetupVoiceprintComponent } from './setup-voiceprint/setup-voiceprint.component';
import { RecordVoiceprintComponent } from './setup-voiceprint/record-voiceprint/record-voiceprint.component';
import { SyncCalenderComponent } from './sync-calender/sync-calender.component';
import { VerifyRecordedVoiceprintComponent } from './setup-voiceprint/verify-recorded-voiceprint/verify-recorded-voiceprint.component';
import { CalendarIntegrationModule } from '../calendar-integration/calendar-integration.module';
import { FormsModule } from '@angular/forms';
import { InputModule } from '../ui-components/input/input.module';
import { AudioPlayerModule } from '../common/audio-player/audio-player.module';

@NgModule({
	declarations: [
		OnboardingComponent,
		OnboardingSidePanelComponent,
		StepComponent,
		SetupAccountComponent,
		SetupVoiceprintComponent,
		RecordVoiceprintComponent,
		SyncCalenderComponent,
		VerifyRecordedVoiceprintComponent,
	],
	imports: [
		CommonModule,
		AudioPlayerModule,
		OnboardingRoutingModule,
		SharedModule,
		CalendarIntegrationModule,
		FormsModule,
		InputModule,
	],
})
export class OnboardingModule {}
