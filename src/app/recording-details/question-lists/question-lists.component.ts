import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { RecordingDetailsConfig } from 'src/app/recording-details/recording-details.config';
import { selectQuestionList, selectQuestionListEmptyMessage } from '../store';
import {
	clearTranscriptFilters,
	updateActiveTranscriptFilter,
} from '../store/recording-details.actions';
import * as RecordingDetailsActions from '../store/recording-details.actions';

@Component({
	selector: 'app-question-lists',
	templateUrl: './question-lists.component.html',
	styleUrls: ['./question-lists.component.scss'],
})
export class QuestionListsComponent implements OnInit {
	loaderId = RecordingDetailsConfig.LOADER_IDS.QUESTION_LIST;
	messageString!: string;
	questionList$ = this.store.select(selectQuestionList);
	@Output() highlightQuestionTab = new EventEmitter();

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.store.select(selectQuestionListEmptyMessage).subscribe((message) => {
			if (message) {
				this.messageString = message;
			}
		});
	}

	updateTranscriptFilter(dialogueId: number) {
		this.clearFilters();
		this.store.dispatch(
			updateActiveTranscriptFilter({ activeTranscriptFilter: 'questions' })
		);
		this.store.dispatch(
			RecordingDetailsActions.setActiveConversationCardId({
				id: dialogueId,
				triggeredOnCardSelect: true,
			})
		);
	}

	clearFilters() {
		this.store.dispatch(clearTranscriptFilters());
	}
}
