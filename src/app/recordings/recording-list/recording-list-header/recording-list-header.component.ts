import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
	selector: 'recording-list-header',
	templateUrl: './recording-list-header.component.html',
	styleUrls: ['./recording-list-header.component.scss'],
})
export class RecordingListHeaderComponent {
	@Input() total: number | undefined;

	subscriptions = new Subscription();

	constructor(private store: Store) {}

	onFilterChange() {}
}
