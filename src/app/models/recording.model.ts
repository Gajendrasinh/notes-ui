import { ConversationCard } from './conversation.model';
import { Attendee } from './user.model';

export type RecordingType = 'AUDIO' | 'VIDEO' | undefined;

export type TranscriptsResponse = {
	transcripts: ConversationCard[];
	recordingType: RecordingType;
	recordingPath: string;
};

export interface RecordingDetails {
	name: string;
	meetingTime: number;
	inviter: Attendee;
	participants: Participants;
	organization: Organization;
	eventId: string;
}
export interface Participants {
	employees: Attendee[];
	guests: Attendee[];
}
export interface Organization {
	id: number;
	name: string;
}
