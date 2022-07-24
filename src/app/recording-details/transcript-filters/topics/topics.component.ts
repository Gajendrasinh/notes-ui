import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dialogue, Topic } from 'src/app/models/tracker.model';
import { selectTopicEmptyMessage, selectTopics } from '../../store';
import {
	addSelectedTopic,
	removeSelectedTopic,
	resetSearchTranscript,
} from '../../store/recording-details.actions';

@Component({
	selector: 'app-topics',
	templateUrl: './topics.component.html',
	styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent {
	isTopicSelected: boolean | undefined;

	topics$ = this.store.select(selectTopics);
	selectedTrackers: Dialogue[] = [];
	messageString: string | undefined;
	isExpanded = false;
	MAX_TRACKER_WITHOUT_EXPAND = 5;

	constructor(private store: Store) {
		this.store.select(selectTopicEmptyMessage).subscribe((message) => {
			if (message) {
				this.messageString = message;
			}
		});
	}

	toggleSelectTopic(topic: Topic) {
		if (!topic.isSelected) {
			this.store.dispatch(resetSearchTranscript());
			// To fix highlight issue
			// as highlight data comes from two different data source and rendered in two cycles so glitch is visible
			setTimeout(() => {
				this.store.dispatch(addSelectedTopic({ TopicId: topic.id }));
			}, 100);
		} else {
			topic.isSelected &&
				this.store.dispatch(removeSelectedTopic({ TopicId: topic.id }));
		}
	}

	toggleExpandView() {
		this.isExpanded = !this.isExpanded;
	}
}
