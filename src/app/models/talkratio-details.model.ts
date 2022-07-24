export interface TalkRatioDetails {
	tenantName: string;
	clientName: string;
	eventTalkRatioDto: EventTalkRatio;
}
export interface EventTalkRatio {
	me: number;
	all: number;
	org: number;
	nonOrg: number;
}
