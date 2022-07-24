import {
	AfterViewChecked,
	Component,
	ElementRef,
	EventEmitter,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { Subject, timer } from 'rxjs';
import { map, repeatWhen, takeUntil, tap } from 'rxjs/operators';
import { IWaveSurferOptions } from 'src/app/common/audio-player/audio-player.model';
import {
	AudioRecorder,
	microphonePermission,
	recordAudio,
	RecordedAudio,
} from '../../../shared/utilities/audio-recording';

@Component({
	selector: 'app-record-voiceprint',
	templateUrl: './record-voiceprint.component.html',
	styleUrls: ['./record-voiceprint.component.scss'],
})
export class RecordVoiceprintComponent implements OnInit, AfterViewChecked {
	@Output() stopRecordingVoice = new EventEmitter<{
		recordedAudio: RecordedAudio;
		duration: number;
	}>();
	@Output() startRecordingVoice = new EventEmitter();
	@ViewChild('AudioVisualizer') audioVisualizer!: ElementRef;

	state: 'inactive' | 'recording' | 'recorded' = 'inactive';
	isVisualizationInProgress = false;
	permission!: PermissionState;
	recorder: AudioRecorder | undefined | null;

	audioPlayerCustomOptions: Partial<IWaveSurferOptions> = {
		height: 35,
		waveColor: '#5ad9f4',
		backgroundColor: '#f4f7fa',
	};

	startTimer$ = new Subject();
	stopTimer$ = new Subject();
	duration = 0;
	timer$ = timer(0, 1000).pipe(
		tap((time) => (this.duration = time)),
		map((time) => ({ time })),
		takeUntil(this.stopTimer$),
		repeatWhen(() => this.startTimer$)
	);

	recordedAudio: RecordedAudio | undefined;

	constructor() {}

	ngOnInit(): void {
		this.verifyMicrophonePermission();
	}

	ngAfterViewChecked() {
		if (
			!this.isVisualizationInProgress &&
			this.state === 'recording' &&
			this.recorder &&
			this.audioVisualizer
		) {
			this.recorder.visualize(this.audioVisualizer.nativeElement);
			this.isVisualizationInProgress = true;
		}
	}

	async startRecording() {
		try {
			if (!this.recorder) {
				this.recorder = await recordAudio();
			}
			this.recorder.start();
			this.state = 'recording';
			this.startTimer();
			this.startRecordingVoice.emit();
		} catch (error) {
			this.permission = 'denied';
		}
	}

	verifyMicrophonePermission() {
		microphonePermission().then((permission) => {
			this.permission = permission;
		});
	}

	startTimer() {
		this.startTimer$.next();
	}

	stopTimer() {
		this.stopTimer$.next();
	}

	stopRecording() {
		if (this.recorder) {
			this.recorder.stop().then((response) => {
				this.isVisualizationInProgress = false;
				this.stopRecordingVoice.emit({
					recordedAudio: response,
					duration: this.duration,
				});
				this.recordedAudio = response;
				this.stopTimer();
				this.state = 'recorded';
				this.recorder = null;
			});
		}
	}
}
