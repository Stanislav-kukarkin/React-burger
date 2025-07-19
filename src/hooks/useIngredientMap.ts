import { TIngredient } from '@/interfaces/ingredients';
import { useGetIngredientsQuery } from '@/services/api/ingredients-api';
import { useMemo } from 'react';

export const useIngredientsMap = () => {
	const { data: ingredients, ...rest } = useGetIngredientsQuery();

	const ingredientsMap = useMemo(() => {
		const map = new Map<string, TIngredient>();
		ingredients?.forEach((item) => {
			map.set(item._id, item);
		});
		return map;
	}, [ingredients]);

	return { ingredients, ingredientsMap, ...rest };
};
