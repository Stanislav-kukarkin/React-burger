import { TIngredient } from '@/interfaces/ingredients';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
	order: {
		number: string;
		ingredients: TIngredient[];
	}[];
}

const initialState: OrderState = {
	order: [],
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrder(
			state,
			action: PayloadAction<{ number: string; ingredients: TIngredient[] }>
		) {
			state.order.push(action.payload);
		},

		clearOrder(state, action: PayloadAction<string>) {
			state.order = state.order.filter(
				({ number }) => number != action.payload
			);
		},

		clearAllOrder(state) {
			state.order = [];
		},
	},
});

export const { setOrder, clearOrder, clearAllOrder } = orderSlice.actions;
