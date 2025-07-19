import React, { useMemo } from 'react';
import styles from './orders-panel.module.css';

export const OrdersPanel = ({
	ready,
	inProgress,
}: {
	ready: number[];
	inProgress: number[];
}): React.JSX.Element => {
	const getReady = useMemo(() => {
		return ready.slice(0, 10);
	}, [ready]);

	const getInProgress = useMemo(() => {
		return inProgress.slice(0, 10);
	}, [inProgress]);

	return (
		<div className={`${styles.container}`}>
			<div className={`${styles.ready}`}>
				<div className='text text_type_main-medium pb-6'>Готовы:</div>
				<ul className={`${styles.list} `}>
					{getReady.map((item) => (
						<li
							key={item}
							className={` ${styles.success} text text_type_digits-default `}>
							{item}
						</li>
					))}
				</ul>
			</div>
			<div className={`${styles.inProgress}`}>
				<div className='text text_type_main-medium pb-6'>В работе:</div>
				<ul className={`${styles.list}`}>
					{getInProgress.map((item, index) => (
						<li key={item + index} className={' text text_type_digits-default'}>
							{item}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
