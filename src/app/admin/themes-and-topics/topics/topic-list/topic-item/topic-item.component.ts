import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Topic } from 'src/app/models/admin-topic-list.model';
import { AddTopicComponent } from '../../add-topic/add-topic.component';

@Component({
	selector: 'app-topic-item',
	templateUrl: './topic-item.component.html',
	styleUrls: ['./topic-item.component.scss'],
})
export class TopicItemComponent {
	@Input() topic: Topic | undefined;
	constructor(private dialog: MatDialog, private store: Store) {}

	openEditTopicDialog(topicId: number) {
		this.dialog.open(AddTopicComponent, {
			panelClass: 'add-topic',
			width: '780px',
			height: '600px',
			data: {
				topicId,
			},
		});
	}
}
