import AudioRecorder from 'audio-recorder-polyfill';
import { register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';
import drawDualBars from './visualize-audio/drawDualBars';

export type RecordedAudio = {
	audioBlob: Blob;
	audioUrl: string;
};

export type AudioRecorder = {
	start: () => void;
	stop: () => Promise<RecordedAudio>;
	visualize: (canvas: HTMLCanvasElement) => void;
};

let audioCtx: AudioContext;

export const microphonePermission = () =>
	navigator.permissions.query({ name: 'microphone' }).then(
		(result) => {
			return result.state;
		},
		(error) => {
			throw error.message;
		}
	);

async function initialize() {
	await register(await connect());
}
initialize();

export async function recordAudio() {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		const options = { mimeType: 'audio/wav' };
		const mediaRecorder = new AudioRecorder(stream, options);
		const recordedChunks: Blob[] = [];

		mediaRecorder.addEventListener('dataavailable', (event: any) => {
			if (event.data.size > 0) {
				recordedChunks.push(event.data);
			}
		});

		const start = () => {
			mediaRecorder.start();
		};

		const visualize = (canvas: HTMLCanvasElement) => {
			if (canvas) {
				visualizeAudio(canvas, stream);
			}
		};

		const stop = () => {
			return new Promise<{ audioBlob: Blob; audioUrl: string }>((resolve) => {
				mediaRecorder.addEventListener('stop', () => {
					const audioBlob = new Blob(recordedChunks, {
						type: mediaRecorder.mimeType,
					});
					const audioUrl = URL.createObjectURL(audioBlob);

					resolve({ audioBlob, audioUrl });
				});

				stream.getTracks().forEach((track) => track.stop());
				mediaRecorder.stop();
			});
		};

		return { start, stop, visualize };
	} catch (error) {
		throw error;
	}
}

function visualizeAudio(canvas: HTMLCanvasElement, stream: MediaStream) {
	const canvasCtx = canvas.getContext('2d');

	if (!audioCtx) {
		audioCtx = new AudioContext();
	}

	const source = audioCtx.createMediaStreamSource(stream);

	const analyser = audioCtx.createAnalyser();
	analyser.fftSize = 32768 / 2;
	const bufferLength = analyser.frequencyBinCount;
	const dataArray = new Uint8Array(bufferLength);
	source.connect(analyser);
	//analyser.connect(audioCtx.destination);

	draw();

	function draw() {
		const WIDTH = canvas.width;
		const HEIGHT = canvas.height;

		requestAnimationFrame(draw);

		analyser.getByteFrequencyData(dataArray);

		if (!canvasCtx) {
			return;
		}

		const options: any = {};
		options.stroke = 2;
		options.colors = ['#5ad9f4'];

		canvasCtx.strokeStyle = options.colors[0];
		canvasCtx.lineWidth = options.stroke;

		canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
		canvasCtx.beginPath();

		const functionContext = {
			data: dataArray,
			options,
			ctx: canvasCtx,
			h: HEIGHT,
			w: WIDTH,
		};

		drawDualBars(functionContext);
	}
}
