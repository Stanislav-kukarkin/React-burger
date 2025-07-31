import { orderSlice, setOrder, clearOrder, clearAllOrder } from './order-slice';
import { mockIngredient } from './test-mocks';

const FIRST_NUMBER = '123';
const SECOND_NUMBER = '731';

describe('orderSlice', () => {
	it('should set an order', () => {
		const nextState = orderSlice.reducer(
			{ order: [] },
			setOrder({ number: FIRST_NUMBER, ingredients: [mockIngredient] })
		);
		expect(nextState.order).toHaveLength(1);
		expect(nextState.order[0].number).toBe(FIRST_NUMBER);
	});

	it('should clear an order by number', () => {
		const state = {
			order: [
				{ number: FIRST_NUMBER, ingredients: [mockIngredient] },
				{ number: SECOND_NUMBER, ingredients: [mockIngredient] },
			],
		};
		const nextState = orderSlice.reducer(state, clearOrder(FIRST_NUMBER));
		expect(nextState.order).toHaveLength(1);
		expect(nextState.order[0].number).toBe(SECOND_NUMBER);
	});

	it('should clear all orders', () => {
		const state = {
			order: [
				{ number: FIRST_NUMBER, ingredients: [mockIngredient] },
				{ number: SECOND_NUMBER, ingredients: [mockIngredient] },
			],
		};
		const nextState = orderSlice.reducer(state, clearAllOrder());
		expect(nextState.order).toEqual([]);
	});
});
