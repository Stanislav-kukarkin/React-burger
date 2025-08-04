import {
	burgerConstructorSlice,
	setBun,
	addIngredient,
	removeIngredient,
	clearIngredients,
	moveIngredient,
} from './burger-constructor-slice';
import { mockIngredient, uniqueId } from './test-mocks';

describe('burgerConstructorSlice', () => {
	it('should set bun', () => {
		const nextState = burgerConstructorSlice.reducer(
			{ bun: null, ingredients: [] },
			setBun(mockIngredient)
		);
		expect(nextState.bun).toEqual(mockIngredient);
	});

	it('should add ingredient', () => {
		const state = { bun: null, ingredients: [] };
		const nextState = burgerConstructorSlice.reducer(
			state,
			addIngredient(mockIngredient)
		);
		expect(nextState.ingredients).toHaveLength(1);
		expect(nextState.ingredients[0]).toEqual(mockIngredient);
	});

	it('should remove ingredient by uniqueId', () => {
		const state = {
			bun: null,
			ingredients: [mockIngredient],
		};
		const nextState = burgerConstructorSlice.reducer(
			state,
			removeIngredient(uniqueId)
		);
		expect(nextState.ingredients).toHaveLength(0);
	});

	it('should clear ingredients and bun', () => {
		const state = {
			bun: mockIngredient,
			ingredients: [mockIngredient],
		};
		const nextState = burgerConstructorSlice.reducer(state, clearIngredients());
		expect(nextState.bun).toBeNull();
		expect(nextState.ingredients).toEqual([]);
	});

	it('should move ingredient', () => {
		const state = {
			bun: null,
			ingredients: [
				{ ...mockIngredient, uniqueId: 'a1' },
				{ ...mockIngredient, uniqueId: 'b1' },
			],
		};
		const nextState = burgerConstructorSlice.reducer(
			state,
			moveIngredient({ fromIndex: 0, toIndex: 1 })
		);
		expect(nextState.ingredients[0].uniqueId).toBe('b1');
		expect(nextState.ingredients[1].uniqueId).toBe('a1');
	});
});
