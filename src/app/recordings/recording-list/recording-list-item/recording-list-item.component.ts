import { Component, Input } from '@angular/core';
import { RecordingEvent } from '../../../models/recordings.model';
@Component({
	selector: 'recording-list-item',
	templateUrl: './recording-list-item.component.html',
	styleUrls: ['./recording-list-item.component.scss'],
})
export class RecordingListItemComponent {
	@Input()
	recording: RecordingEvent | undefined;

	constructor() {}
}
