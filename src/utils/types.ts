export type TIngredient = {
	_id: string;
	name: string;
	type: TIngredientType;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_large: string;
	image_mobile: string;
	__v: number;
	uniqueId?: string;
};

export enum TIngredientType {
	Bun = 'bun',
	Main = 'main',
	Sauce = 'sauce',
}
