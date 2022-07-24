import {
	AfterViewInit,
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { getAssetsPath } from 'src/app/shared/utilities/utility-fns';

@Component({
	selector: 'app-video-player',
	templateUrl: './video-player.component.html',
	styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
	@Input()
	url: string | undefined;

	@Output() playVideo = new EventEmitter();
	@Output() pauseVideo = new EventEmitter();
	@Output() playerHandlers = new EventEmitter();

	video: any;
	state = {
		playing: false,
		currentTime: 0,
		duration: 0,
		canplay: false,
		error: false,
		volume: 1,
		waiting: false,
		bufferedRange: {
			start: 0,
			end: 0,
		},
	};
	waitTimeoutCounter: any;
	getAssetsPath = getAssetsPath;

	subscriptions = new Subscription();

	constructor() {}

	ngOnInit(): void {
		this.playerHandlers.emit({
			play: this.play.bind(this),
			pause: this.pause.bind(this),
			updateSeek: this.updateSeek.bind(this),
		});
	}

	ngAfterViewInit(): void {
		this.video = document.getElementById('video_player');

		this.video.volume = this.state.volume;

		this.video.addEventListener('durationchange', () => {
			this.state.canplay = true;
			this.state.duration = parseInt(this.video.duration);
		});

		this.video.addEventListener('loadstart', () => {
			this.state.canplay = true;
			this.state.error = false;
		});

		this.video.addEventListener('timeupdate', () => {
			if (this.state.error) return;

			this.state.currentTime = this.video.currentTime;
		});

		this.video.addEventListener('ended', () => {
			this.state.playing = false;
		});

		this.video.addEventListener('pause', () => {
			this.state.playing = false;
		});

		this.video.addEventListener('play', () => {
			this.state.playing = true;
		});

		this.video.addEventListener('progress', () => {
			try {
				this.state.bufferedRange.start = parseInt(
					this.video.buffered.start(this.video.buffered.length - 1)
				);

				this.state.bufferedRange.end = parseInt(
					this.video.buffered.end(this.video.buffered.length - 1)
				);
			} catch (err) {}
		});

		this.video.addEventListener('waiting', () => {
			// show loader if it takes time more than 1 sec
			this.waitTimeoutCounter = setTimeout(() => {
				this.state.playing && (this.state.waiting = true);
			}, 1000);
		});

		this.video.addEventListener('playing', () => {
			this.state.playing = true;
			this.state.waiting = false;
			// clear show loader counter if content is downloaded within 1 sec
			this.waitTimeoutCounter && clearTimeout(this.waitTimeoutCounter);
		});

		this.video.addEventListener('error', () => {
			this.state.playing = false;
			this.state.waiting = false;
			this.state.error = true;
		});

		this.video.addEventListener('volumechange', () => {
			this.state.volume = this.video.volume;
		});

		this.video.disablePictureInPicture = true;
	}

	loadIfError() {
		if (this.state.error) {
			this.video.currentTime = 0;
			this.video.load();
		}
	}

	play() {
		this.playVideo.emit();
		this.loadIfError();
		this.video.currentTime = this.state.currentTime;
		this.state.playing = true;
		this.video.play();
	}

	pause() {
		this.pauseVideo.emit();
		this.state.playing = false;
		this.video.pause();
	}

	skip(value: any) {
		this.loadIfError();
		this.video.currentTime = this.video.currentTime + value;
	}

	handleVolumeChange(change: number) {
		this.video.volume = change;
	}

	toggleMute() {
		this.video.volume = this.state.volume > 0 ? 0 : 1;
	}

	handleSeekChange(change: number) {
		this.state.currentTime = change;
	}

	updateSeek(change: number) {
		this.video.currentTime = this.state.currentTime = change;
	}

	handleSeekStart() {
		this.pause();
	}

	handleSeekEnd() {
		this.play();
	}

	openFullscreen() {
		this.video = document.getElementById('video_player');
		if (this.video.requestFullscreen) {
			this.video.requestFullscreen();
		} else if (this.video.webkitRequestFullscreen) {
			this.video.webkitRequestFullscreen();
		} else if (this.video.msRequestFullscreen) {
			this.video.msRequestFullscreen();
		} else if (this.video.mozRequestFullScreen) {
			this.video.mozRequestFullScreen();
		}
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
