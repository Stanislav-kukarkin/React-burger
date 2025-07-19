import React from 'react';
import styles from './order-status.module.css';
import { EOrderStatus } from '@/interfaces/order';

type Props = {
	status: EOrderStatus;
};

export const OrderStatus = ({ status }: Props): React.JSX.Element => {
	switch (status) {
		case EOrderStatus.Pending:
			return <span>Готовится</span>;
		case EOrderStatus.Done:
			return <span className={styles.statusDone}>Выполнен</span>;
		case EOrderStatus.Created:
			return <span>Создан</span>;
		default:
			return <span>Неизвестный статус</span>;
	}
};
