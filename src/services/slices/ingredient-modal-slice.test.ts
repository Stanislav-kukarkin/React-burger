import {
	ingredientModalSlice,
	setCurrentIngredient,
	clearCurrentIngredient,
} from './ingredient-modal-slice';
import { mockIngredient } from './test-mocks';

describe('ingredientModalSlice', () => {
	it('should set current ingredient', () => {
		const nextState = ingredientModalSlice.reducer(
			{ currentIngredient: null },
			setCurrentIngredient(mockIngredient)
		);
		expect(nextState.currentIngredient).toEqual(mockIngredient);
	});

	it('should clear current ingredient', () => {
		const nextState = ingredientModalSlice.reducer(
			{ currentIngredient: mockIngredient },
			clearCurrentIngredient()
		);
		expect(nextState.currentIngredient).toBeNull();
	});
});
