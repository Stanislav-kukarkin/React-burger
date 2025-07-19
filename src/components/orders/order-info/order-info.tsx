import React, { useMemo } from 'react';
import styles from './order-info.module.css';
import { TIngredient } from '@/interfaces/ingredients';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsImg from '@/components/ui/ingredient-img/ingredients-img';
import { OrderStatus } from '@/components/ui/order-status/order-status';
import { useGetOrderByNumberQuery } from '@/services/api/order-api';
import { useParams } from 'react-router-dom';
import { useIngredientsMap } from '@/hooks/useIngredientMap';
import { Preloader } from '@/components/ui/preloader/preloader';

type IngredientWithCount = TIngredient & { count: number };

export const OrderInfo = ({
	isPage,
}: {
	isPage?: boolean;
}): React.JSX.Element => {
	const params = useParams();
	const { data, isLoading, isError } = useGetOrderByNumberQuery(
		params.id ?? ''
	);
	const { ingredientsMap, isLoading: ingredientsAreLoad } = useIngredientsMap();

	const orderIngredients = data?.orders?.[0]?.ingredients ?? [];

	const ingredientsList = useMemo(() => {
		const map = new Map<string, IngredientWithCount>();

		orderIngredients.forEach((id: string) => {
			const item = ingredientsMap.get(id);
			if (!item) return;

			if (map.has(item._id)) {
				map.get(item._id)!.count += 1;
			} else {
				map.set(item._id, { ...item, count: 1 });
			}
		});

		return Array.from(map.values());
	}, [orderIngredients, ingredientsMap]);

	const totalPrice = useMemo(() => {
		return data?.orders[0].ingredients.reduce(
			(sum: number, id: string) => sum + (ingredientsMap.get(id)?.price ?? 0),
			0
		);
	}, [data?.orders[0].ingredients, ingredientsMap]);

	if (isLoading || ingredientsAreLoad) {
		return <Preloader />;
	}

	if (isError || !data?.orders?.length) {
		return <p>Заказ не найден</p>;
	}

	const { orders } = data;

	return (
		<>
			<div className={`${styles.container} ${isPage ? styles.isPage : ''}`}>
				<p className={`${styles.header} text text_type_digits-default`}>
					#{orders[0].number}
				</p>
				<div className={styles.body}>
					<div className={styles.name}>{orders[0].name}</div>

					<OrderStatus status={orders[0].status} />

					<div className={styles.ingredients}>
						<h4>Состав:</h4>
						<ul className={`${styles.list} `}>
							{ingredientsList.map((item) => (
								<li
									key={item._id}
									className={`${styles.itemContainer} text text_type_digits-default `}>
									<div className={styles.ingredientImg}>
										<IngredientsImg src={item.image} />
									</div>

									<div
										className={`${styles.ingredientName} text text_type_main-small`}>
										{item.name}
									</div>
									<div className={styles.ingredientCost}>
										<span className='text text_type_digits-default'>
											{item.count} x {item.price}
										</span>
										<CurrencyIcon type='primary' />
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className={styles.footer}>
					<FormattedDate
						className={styles.date}
						date={new Date(orders[0].updatedAt)}
					/>

					<div className={styles.total}>
						<span className='text text_type_digits-default'>{totalPrice}</span>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</div>
		</>
	);
};
