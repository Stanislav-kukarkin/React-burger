import React, { useMemo } from 'react';
import styles from './feed-info.module.css';
import { OrdersPanel } from './orders-panel/orders-panel';
import { TOrder } from '@/interfaces/order';

interface FeedInfoProps {
	orders: TOrder[];
	total: string;
	totalToday: string;
}

export const FeedInfo = ({
	orders,
	total,
	totalToday,
}: FeedInfoProps): React.JSX.Element => {
	const [doneOrders, pendingOrders] = useMemo(() => {
		const done: number[] = [];
		const pending: number[] = [];

		for (const order of orders) {
			if (order.status === 'done' && done.length < 10) {
				done.push(order.number);
			} else if (order.status === 'pending' && pending.length < 10) {
				pending.push(order.number);
			}
			if (done.length >= 10 && pending.length >= 10) break;
		}

		return [done, pending];
	}, [orders]);

	return (
		<div className={`${styles.container}`}>
			<OrdersPanel ready={doneOrders} inProgress={pendingOrders} />
			<>
				<div className='text text_type_main-medium'>
					Выполнено за все время:
				</div>
				<p className={`${styles.digits} text text_type_digits-large`}>
					{total}
				</p>
			</>
			<>
				<div className='text text_type_main-medium'>Выполнено за сегодня:</div>
				<p className={`${styles.digits} text text_type_digits-large`}>
					{totalToday}
				</p>
			</>
		</div>
	);
};
