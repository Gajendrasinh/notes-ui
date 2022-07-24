export interface IAudioPlayerState {
	initialized: boolean;
	url: string | undefined;
	playing: boolean;
	currentTime: number;
	duration: number;
	canplay: boolean;
	error: boolean;
	playbackRate: string;
	volume: number;
}

export interface IWaveSurferOptions {
	audioRate?: number;
	audioContext?: any;
	audioScriptProcessor?: any;
	autoCenter?: boolean;
	backend?: string;
	backgroundColor?: string;
	barGap?: number;
	barHeight?: number;
	barMinHeight?: number;
	barRadius?: number;
	barWidth?: number;
	closeAudioContext?: boolean;
	container?: string | HTMLElement;
	cursorColor?: string;
	cursorWidth?: number;
	drawingContextAttributes?: any;
	fillParent?: boolean;
	forceDecode?: boolean;
	height?: number;
	hideScrollbar?: boolean;
	interact?: boolean;
	loopSelection?: boolean;
	maxCanvasWidth?: number;
	mediaControls?: boolean;
	mediaType?: string;
	minPxPerSec?: number;
	normalize?: boolean;
	partialRender?: boolean;
	pixelRatio?: number;
	plugins?: any;
	progressColor?: string;
	regionsMinLength?: number;
	removeMediaElementOnDestroy?: boolean;
	renderer?: any;
	responsive?: boolean | number;
	scrollParent?: boolean;
	skipLength?: number;
	splitChannels?: boolean;
	waveColor?: string;
	xhr?: {
		cache?: string;
		mode?: string;
		method?: string;
		credentials?: string;
		redirect?: string;
		referrer?: string;
		headers?: [{ key: string; value: string }];
	};
	splitChannelsOptions?: {
		overlay?: boolean;
		relativeNormalization?: boolean;
		filterChannels?: any;
		channelColors?: {
			[key: number]: { progressColor: string; waveColor: string };
		};
	};
}

export type AudioPlayerHandlers = {
	play: () => void;
	pause: () => void;
	stop: () => void;
	updateSeek: (time: number) => void;
};
