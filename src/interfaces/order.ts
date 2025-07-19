export type TOrdersResponse = {
	success: boolean;
	orders: TOrder[];
	total: number;
	totalToday: number;
};

export type TOrder = {
	createdAt: string;
	ingredients: string[];
	name: string;
	number: number;
	status: EOrderStatus;
	updatedAt: string;
	_id: string;
};

export enum EOrderStatus {
	Created = 'created',
	Pending = 'pending',
	Done = 'done',
}
