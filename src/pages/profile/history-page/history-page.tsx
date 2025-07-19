import { OrderCard } from '@/components/orders/order-card/order-card';
import React from 'react';
import styles from './history-page.module.css';
import { useGetProfileOrdersWSQuery } from '@/services/api/order-api';
import { getAccessToken } from '@/utils/token-utils';
import { useIngredientsMap } from '@/hooks/useIngredientMap';

export const HistoryPage = (): React.JSX.Element => {
	const token = getAccessToken()?.replace('Bearer ', '') ?? '';

	const { ingredientsMap, isLoading: ingredientsAreLoad } = useIngredientsMap();
	const { data, error, isLoading } = useGetProfileOrdersWSQuery(token);

	if (error) return <div>Ошибка загрузки заказов</div>;

	return (
		<div className={`${styles.orderList}`}>
			{data?.orders &&
				!isLoading &&
				!ingredientsAreLoad &&
				data?.orders
					.filter(Boolean)
					.reverse()
					.map((item) => (
						<OrderCard
							key={item._id}
							order={item}
							ingredientsMap={ingredientsMap}
							isLoading={isLoading || ingredientsAreLoad}></OrderCard>
					))}
		</div>
	);
};
