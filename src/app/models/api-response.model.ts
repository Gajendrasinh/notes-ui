export interface ApiResponse<T> {
	status: {
		statusCode: string;
		description: string;
	};
	data: T;
}
