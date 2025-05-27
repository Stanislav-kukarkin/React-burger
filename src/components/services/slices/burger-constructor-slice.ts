import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@/utils/types';

interface ConstructorState {
	bun: TIngredient | null;
	ingredients: TIngredient[];
}

const initialState: ConstructorState = {
	bun: null,
	ingredients: [],
};

export const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		setBun(state, action: PayloadAction<TIngredient>) {
			state.bun = action.payload;
		},

		addIngredient(
			state,
			action: PayloadAction<TIngredient & { uniqueId: string }>
		) {
			state.ingredients.push(action.payload);
		},

		removeIngredient(state, action: PayloadAction<string>) {
			state.ingredients = state.ingredients.filter(
				(i) => i.uniqueId !== action.payload
			);
		},

		clearIngredients(state) {
			state.bun = null;
			state.ingredients = [];
		},

		moveIngredient(
			state,
			action: PayloadAction<{ fromIndex: number; toIndex: number }>
		) {
			const { fromIndex, toIndex } = action.payload;
			const moved = state.ingredients.splice(fromIndex, 1)[0];
			state.ingredients.splice(toIndex, 0, moved);
		},
	},
});

export const {
	setBun,
	addIngredient,
	removeIngredient,
	clearIngredients,
	moveIngredient,
} = burgerConstructorSlice.actions;
