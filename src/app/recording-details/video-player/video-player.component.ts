import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiConstants } from 'src/app/shared/constants/api-urls';
import {
	selectJumpToTime,
	selectRecordingId,
	selectRecordingPath,
} from '../store';

@Component({
	selector: 'recording-details-video-player',
	templateUrl: './video-player.component.html',
	styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
	url: string | undefined;
	subscriptions = new Subscription();
	player: any;

	constructor(private store: Store, private authService: AuthService) {
		this.subscriptions.add(
			this.store.select(selectRecordingPath).subscribe((recordingPath) => {
				if (recordingPath) {
					this.url = recordingPath;
				}
			})
		);
	}
	ngOnInit(): void {
		this.subscriptions.add(
			this.store.select(selectJumpToTime).subscribe((time) => {
				this.player?.updateSeek(time);
				this.player?.play();
			})
		);
	}

	onPlay() {
		this.subscriptions.add(
			this.store.select(selectRecordingId).subscribe((recordingId) => {
				this.authService
					.updateAuthCookie(ApiConstants.AUDIO_VIDEO_URL(recordingId!))
					.then(() => {});
			})
		);
	}

	registerPlayerHandlers(handlers: any) {
		this.player = handlers;
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
