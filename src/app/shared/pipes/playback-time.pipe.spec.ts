import { PlaybackTimePipe } from './playback-time.pipe';

describe('PlaybackTimePipe', () => {
	it('create an instance', () => {
		const pipe = new PlaybackTimePipe();
		expect(pipe).toBeTruthy();
	});
});
