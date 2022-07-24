import {
	Component,
	ElementRef,
	EventEmitter,
	OnDestroy,
	Output,
	ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { TranscriptSearchResult } from 'src/app/models/transcript-search.model';
import { KEYBOARD_SHORTCUTS } from 'src/app/shared/constants/keyboard-shortcuts';
import { HotKeysService } from 'src/app/shared/utilities/hot-keys.service';
import {
	selectTranscriptSearch,
	selectTranscriptSearchResults,
} from '../store';
import * as RecordingDetailsActions from '../store/recording-details.actions';
@Component({
	selector: 'app-transcript-search',
	templateUrl: './transcript-search.component.html',
	styleUrls: ['./transcript-search.component.scss'],
})
export class TranscriptSearchComponent implements OnDestroy {
	@ViewChild('SearchInput') searchInput: ElementRef | undefined;
	@ViewChild('ArrowPreview') arrowPreview: ElementRef | undefined;
	@ViewChild('ArrowNext') arrowNext: ElementRef | undefined;

	@Output() searchTranscript = new EventEmitter<{
		searchBy: string;
		activeSearchIndex?: number;
		card?: number;
	}>();

	searchResults$ = this.store.select(selectTranscriptSearchResults);

	activeSearchIndex = 0;
	activeChattingBtn = false;

	searchControl: FormControl;
	subscriptions = new Subscription();
	hotKeySubscriptions: Subscription[] = [];

	constructor(private store: Store, private hotKeysService: HotKeysService) {
		this.searchControl = new FormControl();
		this.searchResults$.subscribe(() => {
			this.activeSearchIndex = 0;
		});
		this.searchControl.valueChanges
			.pipe(
				tap((searchBy) => {
					searchBy?.length === 1 && this.initializeShortcuts();
				}),
				debounceTime(500)
			)
			.subscribe((searchBy) => {
				if (searchBy === '') {
					this.clearSearch();
				}
				this.activeSearchIndex = 0;
				/** Set Active search index only when we have valid search value */
				this.searchTranscript.emit({
					searchBy,
					activeSearchIndex: searchBy ? this.activeSearchIndex : undefined,
				});
			});

		this.store.select(selectTranscriptSearch).subscribe((data) => {
			if (data && data.searchBy !== this.searchControl.value) {
				this.searchControl.setValue(data.searchBy);
			}
			if (!data) {
				this.searchControl.setValue(null);
			}
		});
	}

	initializeShortcuts() {
		/** Focus on Search input on this shortcut */
		this.hotKeySubscriptions.push(
			this.hotKeysService
				.addShortcut({ keys: KEYBOARD_SHORTCUTS.SEARCH_TRANSCRIPT })
				.subscribe(() => {
					this.searchInput?.nativeElement.focus();
				})
		);
		/** Next transcript search */
		this.hotKeySubscriptions.push(
			this.hotKeysService
				.addShortcut({ keys: KEYBOARD_SHORTCUTS.SEARCH_TRANSCRIPT_NEXT })
				.subscribe(() => {
					if (this.searchControl.value) {
						this.arrowNext?.nativeElement.click();
					}
				})
		);

		/** Prev transcript search */
		this.hotKeySubscriptions.push(
			this.hotKeysService
				.addShortcut({ keys: KEYBOARD_SHORTCUTS.SEARCH_TRANSCRIPT_PREV })
				.subscribe(() => {
					if (this.searchControl.value) {
						this.arrowPreview?.nativeElement.click();
					}
				})
		);
	}
	clearSearch() {
		this.searchControl.reset();
		this.unsubscribeHotfixSubscriptions();
		this.store.dispatch(RecordingDetailsActions.resetSearchTranscript());
	}

	nextPrevSearch(searchResults: TranscriptSearchResult[], isPrev?: boolean) {
		this.activeSearchIndex = this.activeSearchIndex + (isPrev ? 1 : -1);
		const active = searchResults[this.activeSearchIndex];
		this.searchTranscript.next({
			searchBy: this.searchControl.value,
			activeSearchIndex: this.activeSearchIndex,
			card: active.conversationCardIndex,
		});
	}

	toggleQuestionFilter() {
		this.store.dispatch(RecordingDetailsActions.toggleQuestionFilter());
		this.activeSearchIndex = 0;
	}
	handleComments() {
		this.activeChattingBtn = !this.activeChattingBtn;
	}

	file_download() {}

	unsubscribeHotfixSubscriptions() {
		this.hotKeySubscriptions.forEach((h) => h.unsubscribe());
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
		this.unsubscribeHotfixSubscriptions();
	}
}
