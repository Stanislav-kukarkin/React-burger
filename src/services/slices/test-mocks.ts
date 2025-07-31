import { TIngredient, TIngredientType } from '@/interfaces/ingredients';

export const uniqueId = 'unique-123';

export const mockIngredient: TIngredient & { uniqueId: string } = {
	_id: '123',
	name: 'someIngredient',
	type: TIngredientType.Bun,
	proteins: 1,
	fat: 0,
	carbohydrates: 2,
	calories: 5,
	price: 10,
	image: '',
	image_mobile: '',
	image_large: '',
	__v: 0,
	uniqueId: uniqueId,
};
