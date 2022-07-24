import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordingDetailsRoutingModule } from './recording-details-routing.module';
import { RecordingDetailsComponent } from './recording-details.component';
import { RecordingDetailsHeaderComponent } from './recording-details-header/recording-details-header.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { TranscriptComponent } from './transcript/transcript.component';
import { TalkRatioComponent } from './talk-ratio/talk-ratio.component';
import { SharedModule } from '../shared/shared.module';
import { TranscriptSearchComponent } from './transcript-search/transcript-search.component';
import { ConversationCardComponent } from './transcript/conversation-card/conversation-card.component';
import { ConversationComponent } from './transcript/conversation-card/conversation/conversation.component';
import { HighlightDirective } from './directives/highlight.directive';
import { StoreModule } from '@ngrx/store';
import * as fromRecordingDetails from './store';
import { EffectsModule } from '@ngrx/effects';
import { RecordingDetailsEffects } from './store/recording-details.effects';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { ChartsModule } from '../shared/charts/charts.module';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import { UpdateSpeakerConfirmComponent } from './dialogs/update-speaker-confirm/update-speaker-confirm.component';
import { UpdateSpeakerNameComponent } from './dialogs/update-speaker-name/update-speaker-name.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { TranscriptFiltersComponent } from './transcript-filters/transcript-filters.component';
import { VideoPlayerModule } from '../common/video-player/video-player.module';
import { TopicsComponent } from './transcript-filters/topics/topics.component';
import { AudioPlayerModule } from '../common/audio-player/audio-player.module';
import { ActionItemsComponent } from './action-items/action-items.component';
import { QuestionListsComponent } from './question-lists/question-lists.component';

@NgModule({
	declarations: [
		RecordingDetailsComponent,
		RecordingDetailsHeaderComponent,
		AudioPlayerComponent,
		TranscriptComponent,
		TalkRatioComponent,
		TranscriptSearchComponent,
		ConversationCardComponent,
		ConversationComponent,
		HighlightDirective,
		VideoPlayerComponent,
		UpdateSpeakerConfirmComponent,
		UpdateSpeakerNameComponent,
		MeetingDetailsComponent,
		TopicsComponent,
		TranscriptFiltersComponent,
		ActionItemsComponent,
		QuestionListsComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		RecordingDetailsRoutingModule,
		StoreModule.forFeature(
			fromRecordingDetails.recordingDetailsFeatureKey,
			fromRecordingDetails.reducer
		),
		EffectsModule.forFeature([RecordingDetailsEffects]),
		ChartsModule,
		FormsModule,
		AvatarModule,
		AudioPlayerModule,
		VideoPlayerModule,
	],
})
export class RecordingDetailsModule {}
