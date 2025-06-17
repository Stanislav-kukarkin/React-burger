import React from 'react';
import { TIngredient } from '@/interfaces/ingredients';
import styles from './burger-ingredients-segment.module.css';
import { BurgerIngredientItem } from './burger-igredient-item/burger-ingredient-item';

type TBurgerIngredientsSegmentProps = {
	ingredients: TIngredient[];
	title: string;
	onItemClick: (item: TIngredient) => void;
};

export const BurgerIngredientsSegment = ({
	ingredients,
	title,
	onItemClick,
}: TBurgerIngredientsSegmentProps): React.JSX.Element => {
	return (
		<>
			<h3>{title}</h3>
			<article className={styles.ingredientsContainer}>
				{ingredients.map((item) => (
					<BurgerIngredientItem
						key={item._id}
						item={item}
						onItemClick={() => onItemClick(item)}
					/>
				))}
			</article>
		</>
	);
};
