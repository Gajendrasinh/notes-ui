import { Attendee } from './user.model';

export interface Conversation {
	conversationId?: number;
	dialogueId: number;
	endTime: number;
	isQuestion: boolean;
	speaker: Attendee;
	startTime: number;
	transcript: string;
}
export interface ConversationCard {
	id: number;
	conversations: Conversation[];
	isQuestion?: boolean;
}
