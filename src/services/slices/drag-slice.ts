import { TIngredientType } from '@/interfaces/ingredients';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface DragState {
	isDragging: boolean;
	type: TIngredientType | null;
}

const initialState: DragState = {
	isDragging: false,
	type: null,
};

export const dragSlice = createSlice({
	name: 'drag',
	initialState: initialState,
	reducers: {
		startDragging: (state, action: PayloadAction<TIngredientType>) => {
			state.type = action.payload;
			state.isDragging = true;
		},
		stopDragging: (state) => {
			state.isDragging = false;
			state.type = null;
		},
	},
});

export const { startDragging, stopDragging } = dragSlice.actions;
