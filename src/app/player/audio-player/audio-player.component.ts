// @ts-ignore
import {
	AfterContentInit,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import WaveSurfer from 'wavesurfer.js';
import {
	AudioPlayerHandlers,
	IAudioPlayerState,
	IWaveSurferOptions,
} from './audio-player.model';

@Component({
	selector: 'do-audio-player',
	templateUrl: './audio-player.component.html',
	styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent
	implements OnInit, AfterContentInit, OnDestroy
{
	@Input() src!: string;
	@Input() showDownload = false;
	@Output() playerHandlers = new EventEmitter<AudioPlayerHandlers>();
	@Output() initialized = new EventEmitter<IAudioPlayerState>();
	@Output() changeCurrentTime = new EventEmitter<IAudioPlayerState>();

	@Input() hideToolbar = false;
	@Input() customCssClass = '';
	@Input() customOptions: Partial<IWaveSurferOptions> = {};
	@Input() duration!: number;

	playbackRates: string[] = ['0.5x', '1x', '1.5x', '2x'];
	state: IAudioPlayerState = {
		initialized: false,
		url: undefined,
		playing: false,
		currentTime: 0,
		duration: 0,
		canplay: false,
		error: false,
		playbackRate: this.playbackRates[1],
		volume: 1,
	};
	waveSurfer: any;
	options: IWaveSurferOptions = {
		backend: 'MediaElement',
		container: '#audio-player',
		barGap: 2,
		barMinHeight: 1,
		height: 50,
		responsive: true,
		barWidth: 2,
		backgroundColor: 'transparent',
		cursorColor: 'transparent',
		waveColor: '#DEE2ED',
		progressColor: '#59DBF6',
	};

	subscriptions = new Subscription();

	constructor(private changeDetectorRef: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.playerHandlers.emit({
			pause: this.pause.bind(this),
			updateSeek: this.updateSeek.bind(this),
		});
		this.options = { ...this.options, ...this.customOptions };
	}

	ngAfterContentInit(): void {
		this.waveSurfer = WaveSurfer.create(this.options);
		this.waveSurfer.load(this.src);
		this.state.url = this.src;

		const initializeState = () => {
			if (!this.state.initialized && !isNaN(this.waveSurfer.getDuration())) {
				this.state = {
					...this.state,
					playing: false,
					canplay: true,
					duration: parseInt(this.waveSurfer.getDuration()),
					currentTime: 0,
					initialized: true,
				};

				this.initialized.emit(this.state);
			}
		};

		this.waveSurfer.on('ready', () => {
			initializeState();
		});

		let timeout: any;
		this.waveSurfer.on('loading', () => {
			if (!timeout) {
				timeout = setTimeout(() => {
					initializeState();
					timeout = undefined;
				}, 1000);
			}
		});

		this.waveSurfer.on('audioprocess', () => {
			this.updateCurrentTime();
		});

		this.waveSurfer.on('seek', () => {
			this.updateCurrentTime();
		});

		this.waveSurfer.on('finish', () => {
			this.pause();
			this.changeDetectorRef.detectChanges();
		});

		this.waveSurfer.on('error', (err: any) => {
			console.error('Audio player error', err);
			this.state.error = true;
		});
	}

	ngOnDestroy(): void {
		this.waveSurfer.unAll();
		this.subscriptions.unsubscribe();
	}

	updateCurrentTime() {
		const currentTime: number = parseInt(this.waveSurfer.getCurrentTime());
		if (currentTime !== this.state.currentTime) {
			this.state.currentTime = currentTime;
			this.changeDetectorRef.detectChanges();

			this.changeCurrentTime.emit(this.state);
		}
	}

	pause() {
		this.state.playing = false;
		this.waveSurfer.pause();
	}

	play() {
		this.state.playing = true;
		this.waveSurfer.play();
	}

	skip(seconds: number) {
		this.waveSurfer.skip(seconds);
	}

	volumeChange(change: any) {
		this.state.volume = change.value;
		this.waveSurfer.setVolume(this.state.volume);
	}

	changePlaybackRate(rate: string) {
		this.state.playbackRate = rate;
		this.waveSurfer.setPlaybackRate(parseFloat(rate));
	}

	updateSeek(time: number) {
		let updatedTime;

		if (this.state.currentTime < time) {
			updatedTime = time - this.state.currentTime;
		} else {
			updatedTime = (this.state.currentTime - time) * -1;
		}

		this.skip(updatedTime);
		this.state.currentTime = time;
	}
}
