import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@/utils/types';

interface ModalState {
	currentIngredient: TIngredient | null;
}

const initialState: ModalState = {
	currentIngredient: null,
};

export const ingredientModalSlice = createSlice({
	name: 'ingredientModal',
	initialState,
	reducers: {
		setCurrentIngredient(state, action: PayloadAction<TIngredient>) {
			state.currentIngredient = action.payload;
		},
		clearCurrentIngredient(state) {
			state.currentIngredient = null;
		},
	},
});

export const { setCurrentIngredient, clearCurrentIngredient } =
	ingredientModalSlice.actions;
