import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthUserInfo } from 'src/app/models/user.model';
import { RecordedAudio } from 'src/app/shared/utilities/audio-recording';
import { ProfileConfig } from './../profile.config';
import { UtilityService } from 'src/app/shared/utilities/utility.service';
import {
	AudioPlayerHandlers,
	IWaveSurferOptions,
} from 'src/app/common/audio-player/audio-player.model';

import { ApiConstants } from 'src/app/shared/constants/api-urls';

@Component({
	selector: 'app-user-voiceprint',
	templateUrl: './user-voiceprint.component.html',
	styleUrls: ['./user-voiceprint.component.scss'],
})
export class UserVoiceprintComponent implements OnInit {
	loaderId = ProfileConfig.LOADER_IDS.VOICE_PRINT_HEADER_PANEL;
	audioPlayer!: AudioPlayerHandlers;

	recordedAudio: RecordedAudio | undefined = undefined;
	currentUserInfo!: AuthUserInfo;
	duration: number = 0;
	recordingPath: string = '';

	audioPlayerCustomOptions: Partial<IWaveSurferOptions> = {
		height: 70,
		xhr: {
			mode: 'cors',
			credentials: 'include',
		},
	};

	subscriptions = new Subscription();

	constructor(
		private authService: AuthService,
		private utilityService: UtilityService
	) {}

	ngOnInit(): void {
		this.authService.currentUserInfo().then((currentUser) => {
			this.currentUserInfo = currentUser;
		});

		this.updateAuthCookie().then(() => {
			this.recordingPath = ApiConstants.GET_VOICE_PRINT;
		});
	}

	handlePlayerInitialized() {
		this.utilityService.stopLoader(this.loaderId);
	}

	registerPlayerHandlers(handlers: AudioPlayerHandlers) {
		this.audioPlayer = handlers;
	}

	updateAuthCookie() {
		return this.authService.updateAuthCookie(
			ApiConstants.GET_VOICE_PRINT_COOKIE_PATH
		);
	}

	onPlay() {
		this.updateAuthCookie();
	}
}
