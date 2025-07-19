import { useGetAllOrdersWSQuery } from '@/services/api/order-api';
import { FeedInfo } from './feed-info/feed-info';
import styles from './feed-page.module.css';

import { OrdersFeed } from './order-feed/order-feed';
import { Preloader } from '@/components/ui/preloader/preloader';

export const FeedPage = () => {
	const { data, error, isLoading } = useGetAllOrdersWSQuery();

	if (isLoading) return <Preloader />;
	if (error) return <div>Ошибка загрузки заказов</div>;

	const orders = data?.orders ?? [];
	const total = (data?.total ?? '-').toString();
	const totalToday = (data?.totalToday ?? '-').toString();

	return (
		<div className={`${styles.container} `}>
			<h3>Лента заказов</h3>
			{orders && (
				<div className={styles.feed}>
					<OrdersFeed orders={orders} />
					<FeedInfo orders={orders} total={total} totalToday={totalToday} />
				</div>
			)}
		</div>
	);
};
