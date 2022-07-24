import {
	AfterViewInit,
	Component,
	ElementRef,
	Input,
	OnInit,
	ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
	MatAutocompleteSelectedEvent,
	MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, startWith, withLatestFrom } from 'rxjs/operators';
import { Conversation } from 'src/app/models/conversation.model';
import { Participant } from 'src/app/models/participant-details.model';
import { Dialogue } from 'src/app/models/tracker.model';
import { RdDialogsService } from 'src/app/recording-details/dialogs/rd-dialogs.service';
import { RecordingDetailsConfig } from 'src/app/recording-details/recording-details.config';
import {
	selectActiveConversationCardId,
	selectIsSpeakerUpdateInProgress,
	selectParticipants,
	selectTopicByDialogId,
} from 'src/app/recording-details/store';
import {
	jumpToTimeAction,
	setActiveConversationCardId,
	setActiveTopicByDialogueId,
	setActiveTranscriptSearchResult,
	updateSpeaker,
	updateSpeakerFail,
} from 'src/app/recording-details/store/recording-details.actions';
import { sortTrackersByBeginOffset } from 'src/app/shared/utilities/utility-fns';
import { UtilityService } from 'src/app/shared/utilities/utility.service';

@Component({
	selector: 'app-conversation',
	templateUrl: './conversation.component.html',
	styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit, AfterViewInit {
	@Input() conversation!: Conversation;
	@Input() conversationCardId!: number;
	@Input() isEven: boolean | undefined;
	participants$: Observable<Participant[]>;
	speakerUpdateInProgress$ = this.store.select(selectIsSpeakerUpdateInProgress);
	transcript: SafeHtml | undefined;
	transcriptControl: FormControl;
	speakerNameControl: FormControl;
	loaderId!: string;

	SUCCESS_COLOR = '#27ae60';
	INFO_COLOR = '#2f80ed';

	@ViewChild('Transcript') transcriptEl!: ElementRef;
	@ViewChild('SpeakerInput') speakerInputEl!: ElementRef<HTMLInputElement>;
	@ViewChild(MatAutocompleteTrigger)
	speakerAutoCompleteTrigger!: MatAutocompleteTrigger;
	// @ViewChild('TranscriptTextArea') transcriptTextAreaEl!: ElementRef;

	isEditUserName = false;
	isEdit = false;
	_plainTrascriptText!: string;
	isUpdateTranscriptFailed = false;
	isUpdateSpeakerFailed = false;
	dialogId: number | undefined;

	subscriptions = new Subscription();
	speakerDisplayWith = (speaker: any) =>
		typeof speaker === 'string' ? speaker : speaker?.name;
	_participants: Participant[] = [];

	get avatarSpeakerName() {
		return (this.speakerDisplayWith(this.speakerNameControl.value) || '')
			.split('_')
			.join(' ');
	}

	constructor(
		private store: Store,
		private sanitized: DomSanitizer,
		private actions: Actions,
		private dialogService: RdDialogsService
	) {
		this.transcriptControl = new FormControl('', [
			Validators.required,
			UtilityService.required,
		]);
		this.speakerNameControl = new FormControl('');
		this.participants$ = this.speakerNameControl.valueChanges.pipe(
			startWith(''),
			withLatestFrom(this.store.select(selectParticipants)),
			map(([value, participants]) => {
				if (
					value &&
					typeof value === 'string' &&
					value !== this.conversation?.speaker?.name
				) {
					return participants.filter((p) =>
						p.name.toLowerCase().includes(value.toLowerCase())
					);
				}
				this._participants = participants;
				return participants;
			})
		);
	}

	ngOnInit(): void {
		this.transcript = this.sanitized.bypassSecurityTrustHtml(
			this.conversation?.transcript || ''
		);
		this.loaderId = RecordingDetailsConfig.LOADER_IDS.CONVERSATION(
			this.conversation.dialogueId
		);
		this.speakerNameControl.patchValue(this.conversation.speaker.name);

		this.subscriptions.add(
			this.actions
				.pipe(ofType(updateSpeakerFail))
				.subscribe(({ dialogueId }) => {
					if (dialogueId === this.conversation.dialogueId) {
						this.isUpdateSpeakerFailed = true;
						this.resetSpeakerName();
						this.speakerAutoCompleteTrigger.closePanel();
					}
				})
		);

		this.subscriptions.add(
			this.store.select(selectActiveConversationCardId).subscribe((id) => {
				if (id === null || id === this.dialogId) {
					return;
				}
				this.dialogId = id;
			})
		);

		if (this.conversation && this.conversation?.dialogueId) {
			this.store
				.select(selectTopicByDialogId(this.conversation.dialogueId))
				.subscribe(async (dialogues) => {
					let textToReplace = this.conversation?.transcript || '';
					if (dialogues && dialogues.length && this.conversation?.transcript) {
						const sortedDialogues = sortTrackersByBeginOffset(dialogues);

						sortedDialogues.forEach((dialogue: Dialogue) => {
							const word = textToReplace.substring(
								dialogue.beginOffset,
								dialogue.endOffset
							);
							textToReplace =
								textToReplace.substring(0, dialogue.beginOffset) +
								`<span class='tracker-highlight' data-type='tracker' data-dialogueid='${dialogue.id}'>` +
								word +
								'</span>' +
								textToReplace.substring(
									dialogue.endOffset,
									textToReplace.length
								);
						});
					}
					this.transcript =
						this.sanitized.bypassSecurityTrustHtml(textToReplace);
				});
		}
	}

	ngAfterViewInit() {
		/** Reset the speaker name input box if user is not selecting any option from suggestion */
		this.subscriptions.add(
			this.speakerAutoCompleteTrigger.panelClosingActions.subscribe((e) => {
				if (!(e && e.source)) {
					this.resetSpeakerName();
					this.speakerAutoCompleteTrigger.closePanel();
				}
			})
		);
	}

	handleHighlightedTextClick(event: any) {
		const type = event.target.dataset.type;
		if (type === 'tracker') {
			const dialogueId = event.target.dataset.dialogueid;
			this.store.dispatch(
				setActiveTopicByDialogueId({
					dialogueId: parseInt(dialogueId),
				})
			);
		} else {
			const resultIndex = event.target.dataset.index;
			this.store.dispatch(
				setActiveTranscriptSearchResult({
					activeTranscriptSearchResult: parseInt(resultIndex),
				})
			);
		}
		this.store.dispatch(
			setActiveConversationCardId({
				id: this.conversationCardId,
				triggeredOnCardSelect: true,
			})
		);
	}

	handleKeyDown(event: Event) {
		event.stopPropagation();
	}

	getParticipantByName(name: string) {
		return this._participants.find((p) => p.name === name);
	}

	/** Initial set or reset speaker name */
	resetSpeakerName() {
		return this.speakerNameControl.patchValue(this.conversation.speaker.name);
	}

	updateSpeaker(event: MatAutocompleteSelectedEvent) {
		const speaker = event.option.value as Participant;
		this.speakerInputEl.nativeElement.blur();

		if (speaker.isNameRequired) {
			const speakerNameDialogRef =
				this.dialogService.showUpdateSpeakerNameDialog();
			speakerNameDialogRef.afterClosed().subscribe((speakerName) => {
				if (speakerName) {
					this.confirmUpdateSpeaker({ ...speaker, name: speakerName });
				} else {
					this.resetSpeakerName();
				}
			});
		} else {
			this.confirmUpdateSpeaker(speaker);
		}
	}

	confirmUpdateSpeaker(speaker: Participant) {
		if (this.conversation.speaker?.name !== speaker.name) {
			const dialogRef = this.dialogService.showUpdateSpeakerConfirmation();
			this.subscriptions.add(
				dialogRef.afterClosed().subscribe((action) => {
					if (['this', 'all'].includes(action)) {
						this.store.dispatch(
							updateSpeaker({
								dialogueId: this.conversation.dialogueId,
								oldSpeaker: this.conversation.speaker,
								speaker,
								allConversation: action === 'all',
							})
						);
					} else {
						this.resetSpeakerName();
						if (this.speakerInputEl && this.speakerAutoCompleteTrigger) {
							this.speakerAutoCompleteTrigger.closePanel();
							this.speakerInputEl.nativeElement.blur();
						}
					}
				})
			);
		}
	}

	editUserName() {
		if (this.conversation.speaker.editable) {
			this.isEditUserName = true;
			this.speakerInputEl?.nativeElement.focus();
		}
	}
	discardEditUserName() {
		this.isEditUserName = false;
	}

	jumpToTime() {
		this.store.dispatch(
			jumpToTimeAction({
				startTime: this.conversation.startTime,
				endTime: this.conversation.endTime,
				autoStop: true,
			})
		);
	}
}
