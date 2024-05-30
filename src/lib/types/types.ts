export interface User {
	id: number;
	name: string;
}

export interface LoadResult {
	user: User | null;
	auditRatio: number;
	auditRatioUp: number;
	auditRatioDown: number;
	userXpByEvent: number;
	userXpTotal: number;
	skills: any[];
}