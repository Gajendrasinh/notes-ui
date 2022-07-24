import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsDetailsHeaderComponent } from './analytics-details-header/analytics-details-header.component';
import { ParticipantTalkRatioComponent } from './participant-talk-ratio/participant-talk-ratio.component';
import { StoreModule } from '@ngrx/store';
import * as fromAnalyticsDetails from './store';
import { EffectsModule } from '@ngrx/effects';
import { AnalyticsDetailsEffects } from './store/analytics-details.effects';
import { OrgParticipantComponent } from './participant-talk-ratio/org-participant/org-participant.component';
import { AvatarModule } from 'ngx-avatar';
import { NonOrgParticipantComponent } from './participant-talk-ratio/non-org-participant/non-org-participant.component';
import { TopicDiscussedComponent } from './topic-discussed/topic-discussed.component';

@NgModule({
	declarations: [
		AnalyticsComponent,
		AnalyticsDetailsHeaderComponent,
		ParticipantTalkRatioComponent,
		OrgParticipantComponent,
		NonOrgParticipantComponent,
		TopicDiscussedComponent,
	],
	imports: [
		CommonModule,
		AvatarModule,
		SharedModule,
		AnalyticsRoutingModule,
		StoreModule.forFeature(
			fromAnalyticsDetails.analyticsDetailsFeatureKey,
			fromAnalyticsDetails.reducer
		),
		EffectsModule.forFeature([AnalyticsDetailsEffects]),
	],
})
export class AnalyticsModule {}
