import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { filterTopic } from '../../store/actions/themes-and-topics.actions';
import { selectTopicsCount } from '../../store/selectors/themes-and-topics.selectors';
import { AddTopicComponent } from '../add-topic/add-topic.component';

@Component({
	selector: 'app-add-search-topic',
	templateUrl: './add-search-topic.component.html',
	styleUrls: ['./add-search-topic.component.scss'],
})
export class AddSearchTopicComponent implements OnInit, OnDestroy {
	topicsCount$ = this.store.select(selectTopicsCount);

	searchControl: FormControl;
	subscriptions = new Subscription();

	constructor(private dialog: MatDialog, private store: Store) {
		this.searchControl = new FormControl();
	}

	ngOnInit(): void {
		this.subscriptions.add(
			this.searchControl.valueChanges
				.pipe(debounceTime(400))
				.subscribe((searchBy) => this.store.dispatch(filterTopic({ searchBy })))
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	openAddTopicDialog() {
		this.dialog.open(AddTopicComponent, {
			panelClass: 'add-topic',
			width: '780px',
			height: '600px',
		});
	}
}
