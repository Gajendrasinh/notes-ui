import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ConversationCard } from 'src/app/models/conversation.model';
import { selectActiveTranscriptFilter } from '../../store';

@Component({
	selector: 'app-conversation-card',
	templateUrl: './conversation-card.component.html',
	styleUrls: ['./conversation-card.component.scss'],
})
export class ConversationCardComponent {
	@Output() activeHandlersCards = new EventEmitter<any>();

	@Input() conversationCard!: ConversationCard;

	isClubbedCard$ = this.store
		.select(selectActiveTranscriptFilter)
		.pipe(map((filter) => filter === 'questions'));

	constructor(private store: Store) {}
}
