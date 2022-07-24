export interface EventsData {
	eventCount: number;
	lastFetchedTime: number;
	events: RecordingEvent[];
}

export interface RecordingEvent {
	eventId: string;
	name: string;
	meetingTime: number;
	organization: Organization;
	inviter: Inviter;
	totalParticipant: number;
	trackerCount: number;
	duration: number;
	questionCount: number;
}

export interface Inviter {
	name: string;
	email: string;
}

export interface Organization {
	id: number;
	name: string;
}

/* export interface Recording {
  id: number;
  type: 'video' | 'audio';
  title: string;
  time: number;
  duration: number;
  participantCount: number;
  labelCount: number;
  commentCount: number;
  trackerCount: number;
}

export interface RecordingsData {
  total: number;
  pageSize: number;
  recordings: Recording[];
}
 */
