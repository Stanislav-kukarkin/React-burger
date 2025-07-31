import { TIngredient } from '@/interfaces/ingredients';
import styles from './burger-ingredient-item.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/services/store';
import { startDragging, stopDragging } from '@/services/slices/drag-slice';

type BurgerIngredientItemProps = {
	item: TIngredient;
	onItemClick: (item: TIngredient) => void;
};

export const BurgerIngredientItem = ({
	item,
	onItemClick,
}: BurgerIngredientItemProps): React.JSX.Element => {
	const dispatch = useDispatch();
	const [{ isDragging }, dragRef] = useDrag({
		type: 'ingredient',
		item: () => {
			dispatch(startDragging(item.type));
			return item;
		},
		end: () => {
			dispatch(stopDragging());
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const handleClick = () => {
		if (!isDragging) {
			onItemClick(item);
		}
	};

	const count = useSelector(
		(state: RootState) =>
			state.burgerConstructor.ingredients.filter((i) => i._id === item._id)
				.length
	);

	return (
		<div
			role='button'
			data-cy={`ingredient-item-${item.type.toLowerCase()}`}
			tabIndex={0}
			ref={dragRef}
			className={`${styles.ingredientItem} `}
			onClick={handleClick}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					handleClick();
				}
			}}>
			<Counter
				count={count}
				size='default'
				extraClass={`m-1 ${styles.badge} ${count ? styles.visible : styles.hidden}`}
			/>

			<div className='pl-4 pr-4'>
				<img src={item.image} alt={item.name || 'ingredient image'} />
			</div>

			<div className={styles.priceContainer}>
				<span className={styles.price}>{item.price}</span>
				<CurrencyIcon type='primary' />
			</div>

			<span className={`${styles.name} pb-6`}>{item.name}</span>
		</div>
	);
};
