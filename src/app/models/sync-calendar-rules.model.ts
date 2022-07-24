export interface RulesDetails {
	tenantId: number;
	createdDate: string;
	updatedDate: string;
	createdBy: number;
	updatedBy: number;
	id: number;
	name: string;
	description: string;
	rule: Rule[];
}
export interface Rule {
	default: boolean;
	name: string;
	type: string;
}
