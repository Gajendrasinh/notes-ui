import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CalendarIntegrationModule } from '../calendar-integration/calendar-integration.module';
import { AppsMenuModule } from '../common/app-menu/apps-menu.module';
import { AudioPlayerModule } from '../common/audio-player/audio-player.module';
import { SharedModule } from '../shared/shared.module';
import { InputModule } from '../ui-components/input/input.module';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import * as profileDetails from './store';
import { ProfileDetailsEffects } from './store/profile-details.effects';
import { UserCalendarComponent } from './user-calendar/user-calendar.component';
import { UserDetaiilsComponent } from './user-detaiils/user-detaiils.component';
import { UserVoiceprintComponent } from './user-voiceprint/user-voiceprint.component';

@NgModule({
	declarations: [
		ProfileComponent,
		ProfileHeaderComponent,
		UserDetaiilsComponent,
		UserVoiceprintComponent,
		UserCalendarComponent,
	],
	imports: [
		CommonModule,
		ProfileRoutingModule,
		CommonModule,
		SharedModule,
		FormsModule,
		InputModule,
		AudioPlayerModule,
		CalendarIntegrationModule,
		AppsMenuModule,
		StoreModule.forFeature(
			profileDetails.profileDetailsFeatureKey,
			profileDetails.reducer
		),
		EffectsModule.forFeature([ProfileDetailsEffects]),
	],
})
export class ProfileModule {}
