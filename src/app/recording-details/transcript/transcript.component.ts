import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { debounceTime, map, withLatestFrom } from 'rxjs/operators';
import {
	Conversation,
	ConversationCard,
} from 'src/app/models/conversation.model';
import {
	TranscriptSearch,
	TranscriptSearchResult,
} from 'src/app/models/transcript-search.model';
import { escapeRegExp, isVisible } from '../../shared/utilities/utility-fns';
import { VirtualScrollerComponent } from '../../shared/virtual-scroller/virtual-scroller';
import { RecordingDetailsConfig } from '../recording-details.config';
import {
	selectActiveConversationCardId,
	selectActiveTranscriptFilter,
	selectActiveTranscriptSearchResult,
	selectFilteredTranscripts,
	selectSkipTranscriptScroll,
	selectTranscriptEmptyMessage,
	selectTranscriptSearch,
	selectTranscriptSearchResults,
	selectEnableClearFilter,
} from '../store';
import {
	resetTranscriptScroll,
	searchTranscript,
	setSearchTranscriptResults,
} from '../store/recording-details.actions';

const DO_SPACING = 8;
const convCardAdditionalSpace = (designation?: string) =>
	(designation ? 88 : 73) + 12 + 2 + 16 * 2 + 2 + 2;
@Component({
	selector: 'app-transcript',
	templateUrl: './transcript.component.html',
	styleUrls: ['./transcript.component.scss'],
})
export class TranscriptComponent {
	loaderId = RecordingDetailsConfig.LOADER_IDS.TRANSCRIPTS_PANEL;
	transcripts$: Observable<ConversationCard[]>;
	filteredTranscripts$ = this.store.select(selectFilteredTranscripts);
	messageString: string | undefined;
	activeCardId: number | any;

	searchResults: TranscriptSearchResult[] = [];

	HIGHLIGHT_CLASS = RecordingDetailsConfig.HIGHLIGHT_CLASS;

	@ViewChild(VirtualScrollerComponent)
	virtualScoller!: VirtualScrollerComponent;
	@ViewChild('ConvHeightCalcCard', { read: ElementRef })
	conversationHeightCalcCard!: ElementRef<HTMLDivElement>;
	subscriptions = new Subscription();

	virtualScrollCompareItems = (
		item1: ConversationCard,
		item2: ConversationCard
	) => item1 && item2 && item1.id === item2.id;
	virtualScrollCalculateHeightFn = (item: ConversationCard) => {
		const conversationLength = item.conversations.length;
		return item.conversations.reduce(
			(ac, c, index) =>
				this.singleTranscriptHeight(c) +
				ac +
				(index === conversationLength - 1 ? 0 : DO_SPACING - 2),
			0
		);
	};

	singleTranscriptHeight = (item: Conversation) => {
		const p = this.document.createElement('p') as HTMLParagraphElement;
		p.classList.add('conversationMessage', 'text-neutral-7');
		p.innerText = item.transcript;
		this.conversationHeightCalcCard.nativeElement.appendChild(p);
		const transcriptHeight = p.offsetHeight;
		this.conversationHeightCalcCard.nativeElement.removeChild(p);

		return transcriptHeight + convCardAdditionalSpace(item.speaker.designation);
	};

	constructor(
		private store: Store,
		@Inject(DOCUMENT) private document: Document
	) {
		const transcriptSearch$ = this.store.select(selectTranscriptSearch);
		const activeTranscriptSearchResult$ = this.store.select(
			selectActiveTranscriptSearchResult
		);
		const transcriptSearchResults$ = this.store.select(
			selectTranscriptSearchResults
		);
		const skipTranscriptScroll$ = this.store.select(selectSkipTranscriptScroll);
		let prevTranscriptSearch: Partial<TranscriptSearch> = {};
		this.transcripts$ = combineLatest([
			this.filteredTranscripts$,
			transcriptSearch$,
			activeTranscriptSearchResult$,
		]).pipe(
			debounceTime(50),
			withLatestFrom(transcriptSearchResults$, skipTranscriptScroll$),
			map(
				([
					[transcripts, transcriptSearch, activeTranscriptSearchResult],
					prevTranscriptSearchResults,
					skipTranscriptScroll,
				]) => {
					this.searchResults = [];
					let currentResult = -1;

					if (!transcripts.length) {
						this.store
							.select(selectTranscriptEmptyMessage)
							.subscribe((message) => {
								if (message) {
									this.messageString = message;
								}
							});
					}

					if (transcriptSearch?.searchBy) {
						const searchRegExp = new RegExp(
							escapeRegExp(transcriptSearch?.searchBy),
							'gi'
						);
						transcripts = transcripts.map((t, conversationCardIndex) => ({
							...t,
							conversations: t.conversations.map((c, conversationIndex) => ({
								...c,
								transcript: c.transcript.replace(
									searchRegExp,
									(substring: string, matchIndex: number) => {
										currentResult++;
										this.searchResults.push({
											conversationCardIndex,
											conversationIndex,
											matchIndex,
											time: c.startTime,
										});
										return `<span  data-index="${currentResult}" class="${
											this.HIGHLIGHT_CLASS.SEARCH_HIGHLIGHT
										} ${
											currentResult === transcriptSearch.activeSearchIndex
												? this.HIGHLIGHT_CLASS.SEARCH_HIGHLIGHT_ACTIVE
												: ''
										} ${
											currentResult === activeTranscriptSearchResult
												? this.HIGHLIGHT_CLASS.SEARCH_HIGHLIGHT_CLICKED
												: ''
										}">${substring}</span>`;
									}
								),
							})),
						}));

						if (
							prevTranscriptSearch.searchBy !== transcriptSearch?.searchBy ||
							prevTranscriptSearchResults?.length !== this.searchResults.length
						) {
							prevTranscriptSearch.searchBy = transcriptSearch?.searchBy;
							this.store.dispatch(
								setSearchTranscriptResults({
									transcriptSearchResults: this.searchResults,
								})
							);
						}
					} else {
						prevTranscriptSearch = {
							searchBy: undefined,
							activeSearchIndex: undefined,
						};
						if (skipTranscriptScroll) {
							this.store.dispatch(resetTranscriptScroll());
						} else {
							/** On Reset Search Scroll to Top */
							//this.resetScrollToTop();
						}
					}

					return transcripts;
				}
			)
		);

		this.subscriptions.add(
			combineLatest([transcriptSearch$, transcriptSearchResults$])
				.pipe(
					debounceTime(100),
					/** debounce time reduce the multiple quick hits to one */ withLatestFrom(
						skipTranscriptScroll$
					)
				)
				.subscribe(
					([[transcriptSearch, searchResults], skipTranscriptScroll]) => {
						if (skipTranscriptScroll) {
							this.store.dispatch(resetTranscriptScroll());
							return;
						}
						/** Scroll to card which contains the active highlighted element after highlight spans are rendered */
						if (transcriptSearch) {
							prevTranscriptSearch.activeSearchIndex =
								transcriptSearch?.activeSearchIndex;
							const searchResult =
								searchResults?.[transcriptSearch?.activeSearchIndex || 0];
							if (searchResult) {
								const { conversationCardIndex: cardIndex } = searchResult;
								cardIndex != undefined &&
									this.scrollToActiveSearchElement(
										cardIndex,
										transcriptSearch.activeSearchIndex
									);
							}
						} else {
							this.resetScrollToTop();
						}
					}
				)
		);

		this.subscriptions.add(
			this.store
				.select(selectActiveTranscriptSearchResult)
				.pipe(debounceTime(100), withLatestFrom(this.filteredTranscripts$))
				.subscribe(([index = 0]) => {
					if (this.searchResults?.length) {
						const matchedResult = this.searchResults[index];
						if (matchedResult) {
							const { conversationCardIndex: cardIndex } = matchedResult;
							cardIndex && this.scrollToActiveSearchElement(cardIndex, index);
						}
					}
				})
		);

		this.subscriptions.add(
			this.store
				.select(selectActiveConversationCardId)
				.pipe(withLatestFrom(this.store.select(selectFilteredTranscripts)))
				.subscribe(([id, transcripts]) => {
					if (!id) {
						return;
					}
					for (let i = 0; i < transcripts.length; i++) {
						const index = transcripts[i].conversations.findIndex(
							(t) => t.dialogueId === id
						);
						if (index > -1) {
							this.scrollToConversationCardEl(id, id);
							break;
						}
					}
				})
		);

		this.store
			.select(selectEnableClearFilter)
			.pipe(withLatestFrom(this.store.select(selectActiveConversationCardId)))
			.subscribe(([filter, Id]) => {
				if (!Id && filter !== undefined) {
					return;
				}
				this.resetScrollToTop();
				setTimeout(() => {
					const dialogueId = Id !== undefined ? Id : 0;
					this.scrollToConversationCardEl(dialogueId, dialogueId);
				}, 1000);
			});

		this.store.select(selectActiveTranscriptFilter).subscribe(() => {
			this.resetScrollToTop();
		});
	}

	handleSearch(searchObject: {
		searchBy: string;
		activeSearchIndex?: number;
		card?: number;
	}) {
		const { searchBy, activeSearchIndex } = searchObject;
		this.store.dispatch(
			searchTranscript({ transcriptSearch: { searchBy, activeSearchIndex } })
		);

		if (!searchBy) {
			this.resetScrollToTop();
		}
	}

	/** Scroll to the active search element in scroll container */
	scrollToActiveSearchElement(cardIndex: number, activeSearchIndex?: number) {
		const highlightElFn = () =>
			this.document.querySelector(
				`span.${this.HIGHLIGHT_CLASS.SEARCH_HIGHLIGHT}[data-index='${activeSearchIndex}']`
			) as HTMLSpanElement;
		this.scrollToActiveElement(cardIndex, highlightElFn);
	}

	/** Scroll to the active conversation card element in scroll container */
	scrollToConversationCardEl(cardIndex: number, conversationCardId: number) {
		const elSelector = `#conversation-card-${conversationCardId}`;
		const highlightElFn = () =>
			this.document.querySelector(elSelector) as HTMLDivElement;
		this.scrollToActiveElement(cardIndex, highlightElFn);
	}

	/** reset scroll container to top */
	resetScrollToTop() {
		this.scrollToActiveElement(0);
	}

	/** Scroll to the active highlighted span */
	scrollToActiveElement(
		cardIndex: number,
		highlightedElFn?: () => HTMLSpanElement | HTMLDivElement
	) {
		if (!this.virtualScoller) {
			return;
		}

		const scrollContainerEl = this.document.querySelector(`.conversations`);
		const scrollIndex = cardIndex || 0;

		const isSearchElementVisible = () => {
			const highlightEl = highlightedElFn?.();
			if (highlightEl && scrollContainerEl) {
				return isVisible(highlightEl, scrollContainerEl);
			}
			return false;
		};

		if (isSearchElementVisible()) {
			return;
		}

		const virtualScrollFn = () => {
			const { startIndexWithBuffer, endIndexWithBuffer } =
				this.virtualScoller.viewPortInfo;

			if (
				this.virtualScoller &&
				(scrollIndex < startIndexWithBuffer || scrollIndex > endIndexWithBuffer)
			) {
				this.virtualScoller.scrollToIndex(
					scrollIndex,
					true,
					0,
					undefined,
					() => {
						setTimeout(() => {
							virtualScrollFn();
						}, 1000);
					}
				);
			} else {
				let trialCounter = 0;
				const scrollToSearchIfNotVisible = () => {
					const highlightEl = highlightedElFn?.();
					trialCounter++;
					if (highlightEl && !isSearchElementVisible()) {
						highlightEl?.scrollIntoView();
						setTimeout(() => {
							if (trialCounter <= 2) {
								scrollToSearchIfNotVisible();
							}
						}, 1000);
						return;
					}
				};
				scrollToSearchIfNotVisible();
			}
		};

		virtualScrollFn();
	}
}
