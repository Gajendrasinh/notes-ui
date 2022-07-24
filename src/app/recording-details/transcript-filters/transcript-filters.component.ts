import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { RecordingDetailsConfig } from '../recording-details.config';
import {
	selectActiveTranscriptFilter,
	selectEnableClearFilter,
} from '../store';
import {
	clearTranscriptFilters,
	updateActiveTranscriptFilter,
} from '../store/recording-details.actions';

export type TranscriptFilterKey = 'topics' | 'speakers' | 'questions';

type TranscriptFilter = {
	key: TranscriptFilterKey;
	title: string;
};

@Component({
	selector: 'app-transcript-filters',
	templateUrl: './transcript-filters.component.html',
	styleUrls: ['./transcript-filters.component.scss'],
})
export class TranscriptFiltersComponent implements OnInit {
	loaderId = RecordingDetailsConfig.LOADER_IDS.TOPICS;
	filters: TranscriptFilter[] = [
		{ key: 'topics', title: 'Topics' },
		{ key: 'questions', title: 'Questions' },
	];

	_activeFilter: TranscriptFilterKey = 'topics';
	activeFilter$ = this.store
		.select(selectActiveTranscriptFilter)
		.pipe(tap((activeFilter) => (this._activeFilter = activeFilter)));
	enableClearFilter = false;

	@ViewChild('Header', { read: ElementRef }) headerEl!: ElementRef<HTMLElement>;

	get headerHeight() {
		return this._activeFilter === 'questions'
			? this.headerEl?.nativeElement?.offsetHeight || 54
			: undefined;
	}

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.store
			.select(selectEnableClearFilter)
			.subscribe(
				(enableClearFilter) => (this.enableClearFilter = enableClearFilter)
			);
	}

	updateTranscriptFilter(key: TranscriptFilterKey) {
		this.store.dispatch(clearTranscriptFilters());
		this.store.dispatch(
			updateActiveTranscriptFilter({ activeTranscriptFilter: key })
		);
	}

	clearFilters() {
		this.store.dispatch(clearTranscriptFilters());
	}
}
