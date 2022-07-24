/** Onboarding Step */
export interface Step {
	title: string;
	index: number;
	inProgress: boolean;
	complete: boolean;
}

/** Setup account model */
export interface Account {
	organizationName: string;
	website: string;
	designation: string;
	invitedUser?: boolean;
	aliases: string[];
	createdBy?: string;
	createdDate?: string;
	accountEmail?: string;
}

export interface Designation {
	id: number;
	displayName: string;
	name: string;
}

export interface OnboardingState {
	account?: Account;
}
