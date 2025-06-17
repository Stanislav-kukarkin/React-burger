import { TIngredient, TIngredientType } from '@/interfaces/ingredients';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { removeIngredient } from '@/services/slices/burger-constructor-slice';
import { useDrag, useDrop } from 'react-dnd';
import styles from './burger-constructor-item.module.css';

type BurgerConstructorItemProps = {
	item: TIngredient;
	index: number;
	isLocked?: boolean;
	moveItem?: (from: number, to: number) => void;
	type?: 'top' | 'bottom';
};

export const BurgerConstructorItem = ({
	item,
	type,
	index,
	isLocked,
	moveItem,
}: BurgerConstructorItemProps): React.JSX.Element => {
	const dispatch = useDispatch();
	const ref = useRef<HTMLDivElement>(null);

	const [, drop] = useDrop({
		accept: TIngredientType.Main || TIngredientType.Sauce,
		hover(draggedItem: { index: number }) {
			if (!ref.current || draggedItem.index === index || !moveItem) return;
			moveItem(draggedItem.index, index);
			draggedItem.index = index;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: TIngredientType.Main,
		item: { ...item, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(ref));

	const handleClose = useCallback(() => {
		if (item?.uniqueId) dispatch(removeIngredient(item.uniqueId));
	}, [dispatch, item?.uniqueId]);

	return (
		<div
			ref={ref}
			style={{ opacity: isDragging ? 0.5 : 1 }}
			className={moveItem ? `${styles.constructor_main_item}` : ''}>
			{moveItem && <DragIcon type='primary' />}
			<ConstructorElement
				type={type}
				text={item?.name}
				price={item?.price}
				isLocked={isLocked}
				thumbnail={item?.image}
				handleClose={handleClose}
				extraClass={styles.ingredientItem}
			/>
		</div>
	);
};
