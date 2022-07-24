import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject, Subscription, timer } from 'rxjs';
import { repeatWhen, takeUntil, tap } from 'rxjs/operators';
import { RecordingDetailsConfig } from 'src/app/recording-details/recording-details.config';
import {
	getEventList,
	getRecordingListingEmptyMessage,
	setSearchText,
} from '../store/recording.actions';
import {
	selectAllEventsCount,
	selectFilteredEvents,
	selectRecordingListLoaded,
	selectShowWelcomeNote,
} from '../store/recording.selectors';

const POLLING_TIME = 5000; // 5 Second
@Component({
	selector: 'recording-list',
	templateUrl: './recording-list.component.html',
	styleUrls: ['./recording-list.component.scss'],
})
export class RecordingListComponent implements OnInit, OnDestroy {
	events$ = this.store.select(selectFilteredEvents);
	totalEventsCount$ = this.store.select(selectAllEventsCount);
	isRecordingListLoaded$ = this.store.select(selectRecordingListLoaded);
	showWelcomeNote$ = this.store.select(selectShowWelcomeNote);
	loaderId = RecordingDetailsConfig.LOADER_IDS.RECORDING_LISTING_PANEL;
	subscription = new Subscription();
	recordingErrorMassage: string | undefined;

	startPolling$ = new Subject();
	stopPolling$ = new Subject();
	duration = 0;
	polling$ = timer(0, POLLING_TIME).pipe(
		tap(() => this.getEventList()),
		takeUntil(this.stopPolling$),
		repeatWhen(() => this.startPolling$)
	);

	constructor(private store: Store, private actions: Actions) {
		this.actions
			.pipe(ofType(getRecordingListingEmptyMessage))
			.subscribe((res) => {
				this.recordingErrorMassage = res.message;
			});
	}

	ngOnInit(): void {
		this.startPolling$.next();
		this.subscription.add(this.polling$.subscribe());
	}

	getEventList() {
		this.store.dispatch(getEventList());
	}

	ngOnDestroy(): void {
		this.stopPolling$.next();
		this.subscription.unsubscribe();
		this.store.dispatch(setSearchText({ searchText: '' }));
	}
}
