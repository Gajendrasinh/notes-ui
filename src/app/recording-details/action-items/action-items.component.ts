import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RecordingDetailsConfig } from 'src/app/recording-details/recording-details.config';
import { selectActionItemEmptyMessage, selectActionItems } from '../store';

@Component({
	selector: 'app-action-items',
	templateUrl: './action-items.component.html',
	styleUrls: ['./action-items.component.scss'],
})
export class ActionItemsComponent implements OnInit {
	loaderId = RecordingDetailsConfig.LOADER_IDS.ACTION_ITEMS;
	messageString!: string;
	actionItems$ = this.store.select(selectActionItems);
	constructor(private store: Store) {}

	ngOnInit(): void {
		this.store.select(selectActionItemEmptyMessage).subscribe((message) => {
			if (message) {
				this.messageString = message;
			}
		});
	}
}
