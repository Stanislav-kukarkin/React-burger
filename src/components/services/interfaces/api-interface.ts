export interface TOrderRequest {
	ingredients: string[];
}

export interface TOrderResponse {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
}
