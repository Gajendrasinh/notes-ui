import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'playbackTime',
})
export class PlaybackTimePipe implements PipeTransform {
	transform(value: number): unknown {
		let time = value;
		const hours = Math.floor(time / 3600);
		time = time - hours * 3600;
		const minutes = Math.floor(time / 60);
		const seconds = (time - minutes * 60).toFixed(0);

		return `${hours ? `${String(hours).padStart(2, '0')}:` : ''}${String(
			minutes
		).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	}
}
