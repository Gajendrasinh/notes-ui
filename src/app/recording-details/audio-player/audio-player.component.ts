// @ts-ignore
import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
	AudioPlayerHandlers,
	IWaveSurferOptions,
} from 'src/app/common/audio-player/audio-player.model';
import { ApiConstants } from 'src/app/shared/constants/api-urls';
import { UtilityService } from 'src/app/shared/utilities/utility.service';
import { RecordingDetailsConfig } from '../recording-details.config';
import {
	selectJumpToTime,
	selectRecordingId,
	selectRecordingPath,
} from '../store';
import * as RecordingDetailsActions from '../store/recording-details.actions';

@Component({
	selector: 'app-audio-player',
	templateUrl: './audio-player.component.html',
	styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent
	implements OnInit, AfterContentInit, OnDestroy
{
	subscriptions = new Subscription();
	loaderId = RecordingDetailsConfig.LOADER_IDS.AUDIO_PLAYER;
	audioPlayer!: AudioPlayerHandlers;
	recordingPath$ = this.store.select(selectRecordingPath);
	jumpToTime: any;

	audioPlayerCustomOptions: Partial<IWaveSurferOptions> = {
		height: 70,
		xhr: {
			mode: 'cors',
			credentials: 'include',
		},
	};

	constructor(
		private store: Store,
		private actions: Actions,
		private utilityService: UtilityService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.subscriptions.add(
			this.actions
				.pipe(ofType(RecordingDetailsActions.resetSearchTranscript))
				.subscribe(() => {
					this.audioPlayer.pause();
				})
		);

		this.subscriptions.add(
			this.store.select(selectJumpToTime).subscribe((time) => {
				if (time?.autoStop) {
					this.jumpToTime = time;
				}
				this.audioPlayer?.updateSeek(+time.startTime);
				this.audioPlayer?.play();
			})
		);
	}

	ngAfterContentInit(): void {
		this.utilityService.startLoader(this.loaderId);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	handlePlayerInitialized() {
		this.utilityService.stopLoader(this.loaderId);
	}

	registerPlayerHandlers(handlers: AudioPlayerHandlers) {
		this.audioPlayer = handlers;
	}

	onPlay() {
		this.subscriptions.add(
			this.store
				.select(selectRecordingId)
				.subscribe((recordingId) =>
					this.authService.updateAuthCookie(
						ApiConstants.AUDIO_VIDEO_URL(recordingId!)
					)
				)
		);
	}

	playerCurrentTime(event: any) {
		this.store.dispatch(
			RecordingDetailsActions.setActiveConversationCardByStartTime({
				startTime: event.currentTime,
				triggeredOnCardSelect: true,
			})
		);

		if (
			this.jumpToTime?.autoStop &&
			this.jumpToTime?.endTime !== undefined &&
			event.currentTime > this.jumpToTime?.endTime
		) {
			this.audioPlayer.stop();
			this.jumpToTime = '';
		}
	}
}
