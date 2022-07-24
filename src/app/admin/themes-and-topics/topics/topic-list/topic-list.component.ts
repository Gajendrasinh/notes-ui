import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadTopics } from '../../store/actions/themes-and-topics.actions';
import { selectTopics } from '../../store/selectors/themes-and-topics.selectors';
import { ThemesAndTopicsConfig } from '../../themes-and-topics.config';

@Component({
	selector: 'app-topic-list',
	templateUrl: './topic-list.component.html',
	styleUrls: ['./topic-list.component.scss'],
})
export class TopicListComponent implements OnInit {
	loaderId = ThemesAndTopicsConfig.LOADER_IDS.TOPICS;
	topicList$ = this.store.select(selectTopics);

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.store.dispatch(loadTopics());
	}
}
