import { OrderCard } from '@/components/orders/order-card/order-card';
import { TOrder } from '@/interfaces/order';
import React from 'react';
import styles from './order-feed.module.css';

import { useIngredientsMap } from '@/hooks/useIngredientMap';

export const OrdersFeed = ({
	orders,
}: {
	orders: TOrder[];
}): React.JSX.Element => {
	const { ingredientsMap, isLoading } = useIngredientsMap();

	return (
		<div className={`${styles.orderList}`}>
			{orders.filter(Boolean).map((item) => (
				<OrderCard
					key={item._id}
					order={item}
					ingredientsMap={ingredientsMap}
					isLoading={isLoading}></OrderCard>
			))}
		</div>
	);
};
