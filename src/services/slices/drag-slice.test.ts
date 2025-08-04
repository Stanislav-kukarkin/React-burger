import { TIngredientType } from '@/interfaces/ingredients';
import { dragSlice, startDragging, stopDragging } from './drag-slice';

describe('dragSlice', () => {
	it('should start dragging with type', () => {
		const nextState = dragSlice.reducer(
			{ isDragging: false, type: null },
			startDragging(TIngredientType.Bun)
		);
		expect(nextState.isDragging).toBe(true);
		expect(nextState.type).toBe(TIngredientType.Bun);
	});

	it('should stop dragging', () => {
		const nextState = dragSlice.reducer(
			{ isDragging: true, type: TIngredientType.Sauce },
			stopDragging()
		);
		expect(nextState.isDragging).toBe(false);
		expect(nextState.type).toBeNull();
	});
});
