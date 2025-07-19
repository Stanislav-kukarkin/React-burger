import React, { useMemo } from 'react';
import styles from './order-card.module.css';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsStack from './ingredients-stack/ingredients-stack';
import { TOrder } from '@/interfaces/order';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderStatus } from '@/components/ui/order-status/order-status';
import { TIngredient } from '@/interfaces/ingredients';
import { Preloader } from '@/components/ui/preloader/preloader';

type Props = {
	order: TOrder;
	ingredientsMap: Map<string, TIngredient>;
	isLoading: boolean;
};

export const OrderCard = ({
	order,
	ingredientsMap,
	isLoading,
}: Props): React.JSX.Element => {
	const location = useLocation();
	const navigate = useNavigate();

	const isProfileOrders = location.pathname.startsWith('/profile/orders');

	const orderIngredientsInfo = useMemo(() => {
		const [totalPrice, images] = order.ingredients.reduce(
			([sum, imgs], item) => {
				const ingredient = ingredientsMap.get(item);
				if (ingredient) {
					return [sum + ingredient.price, [...imgs, ingredient.image]];
				}
				return [sum, imgs];
			},
			[0, [] as string[]]
		);
		return { totalPrice, images };
	}, [order.ingredients, ingredientsMap]);

	const handleShow = () => {
		navigate(`${location.pathname}/${order.number}`, {
			state: { backgroundLocation: location },
		});
	};

	if (isLoading)
		return (
			<div className={`${styles.card}`}>
				<Preloader />
			</div>
		);

	return (
		<div
			role='button'
			tabIndex={0}
			className={`${styles.card}`}
			onClick={handleShow}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					handleShow();
				}
			}}>
			<div className={`${styles.header}`}>
				<span className='text text_type_digits-default'>#{order.number}</span>
				<FormattedDate
					className={styles.date}
					date={new Date(order.updatedAt)}
				/>
			</div>
			<div className={`${styles.body}`}>
				<span className={`${styles.name}`}>{order.name}</span>
				{isProfileOrders && <OrderStatus status={order.status} />}
			</div>
			<div className={`${styles.footer}`}>
				<IngredientsStack
					images={orderIngredientsInfo.images}></IngredientsStack>
				<div className={styles.priceContainer}>
					<span className='text text_type_digits-default'>
						{orderIngredientsInfo.totalPrice}
					</span>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};
