import React, { useMemo } from 'react';
import styles from './ingredient-info.module.css';
import { TIngredient } from '@/interfaces/ingredients';
import { useParams } from 'react-router-dom';
import { useGetIngredientsQuery } from '@/services/api/ingredients-api';

export const IngredientInfo = ({
	isPage,
}: {
	isPage?: boolean;
}): React.JSX.Element => {
	const params = useParams();
	const { data: ingredients } = useGetIngredientsQuery();

	const item = useMemo(() => {
		return ingredients?.find(
			(ingredient: TIngredient) => ingredient._id === params.id
		);
	}, [params.id, ingredients]);

	if (!item) {
		return <p className={styles.empty}>Ингредиент не найден</p>;
	}

	return (
		<>
			{isPage && <h3 className={styles.header}>Детали ингредиента</h3>}
			<div className={styles.content}>
				<img
					src={item.image}
					alt={item.name || 'ingredient image'}
					width='480'
				/>
				<p className={`mt-4 mb-8 ${styles.name}`}>{item.name}</p>
				<div className={`${styles.nutritions}`}>
					<div className={`${styles.nutrition} text text_type_main-default`}>
						<span className={`${styles.nutrition_title}`}>Калории,ккал</span>
						<span className={`${styles.nutrition_value}`}>{item.calories}</span>
					</div>
					<div className={`${styles.nutrition} text text_type_main-default`}>
						<span className={`${styles.nutrition_title}`}>Белки, г</span>
						<span className={`${styles.nutrition_value}`}>{item.proteins}</span>
					</div>
					<div className={`${styles.nutrition} text text_type_main-default`}>
						<span className={`${styles.nutrition_title}`}>Жиры, г</span>
						<span className={`${styles.nutrition_value}`}>{item.fat}</span>
					</div>
					<div className={`${styles.nutrition} text text_type_main-default`}>
						<span className={`${styles.nutrition_title}`}>Углеводы, г</span>
						<span className={`${styles.nutrition_value}`}>
							{item.carbohydrates}
						</span>
					</div>
				</div>
			</div>
		</>
	);
};
