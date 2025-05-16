import { Modal } from '@/components/ui/modal/modal';
import React, { useMemo } from 'react';
import styles from './order-modal.module.css';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export const OrderModal = ({ isOpen, onClose }: Props): React.JSX.Element => {
	const generateRandomSixDigit = useMemo(() => {
		const num = Math.floor(Math.random() * 1000000);
		return num.toString().padStart(6, '0');
	}, []);

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<div className={styles.content}>
					<p
						className={`${styles.order} text text_type_digits-large mt-4 mb-8`}>
						{generateRandomSixDigit}
					</p>
					<p className={`${styles.identeficator} mb-15`}>
						идентификатор заказа
					</p>
					<img src='/done.svg' className='mb-15' alt='done.svg' />
					<p className={`${styles.status_text} mb-2`}>
						Ваш заказ начали готовить
					</p>
					<p className={`${styles.status_sub_text} mb-15`}>
						Дождитесь готовности на орбитальной станции
					</p>
				</div>
			</Modal>
		</>
	);
};
