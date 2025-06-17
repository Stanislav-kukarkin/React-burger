import React, { useCallback } from 'react';
import styles from './burger-constructor.module.css';
import { BurgerConstructorFooter } from './burger-constructor-footer/burger-constructor-footer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { useDrop } from 'react-dnd';
import {
	addIngredient,
	moveIngredient,
	setBun,
} from '../../services/slices/burger-constructor-slice';
import { BurgerConstructorItem } from './burger-constructor-item/burger-constructor-item';
import { v4 as uuid } from 'uuid';
import { TIngredient, TIngredientType } from '@/interfaces/ingredients';

export const BurgerConstructor = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const { bun, ingredients } = useSelector(
		(state: RootState) => state.burgerConstructor
	);
	const { isDragging, type } = useSelector(
		(state: RootState) => state.dragSlice
	);

	const addIngredientHandler = useCallback(
		(item: TIngredient) => {
			dispatch(addIngredient({ ...item, uniqueId: uuid() }));
		},
		[dispatch]
	);

	const setBunHandler = useCallback(
		(item: TIngredient) => {
			dispatch(setBun(item));
		},
		[dispatch]
	);

	const moveItem = useCallback(
		(from: number, to: number) => {
			dispatch(moveIngredient({ fromIndex: from, toIndex: to }));
		},
		[dispatch]
	);

	const [, dropMiddle] = useDrop({
		accept: 'ingredient',
		canDrop: (item: TIngredient) => item.type !== TIngredientType.Bun,
		drop: addIngredientHandler,
	});

	const [, dropBunTop] = useDrop({
		accept: 'ingredient',
		canDrop: (item: TIngredient) => item.type === TIngredientType.Bun,
		drop: setBunHandler,
	});

	const [, dropBunBottom] = useDrop({
		accept: 'ingredient',
		canDrop: (item: TIngredient) => item.type === TIngredientType.Bun,
		drop: setBunHandler,
	});

	const isBunDragging = isDragging && type === TIngredientType.Bun;
	const isMainDragging = isDragging && type !== TIngredientType.Bun;

	if (!ingredients) return <p>Нет данных</p>;

	return (
		<section className={`${styles.burger_constructor} mt-25`}>
			<ul className={`${styles.burger_constructor_list} pl-4 pr-4`}>
				<li
					ref={dropBunTop}
					className={`${styles.constructor_bun_item} ${isBunDragging ? styles.dropzone_active : ''} pl-8`}>
					{bun ? (
						<BurgerConstructorItem
							type='top'
							item={bun}
							isLocked={true}
							index={0}
						/>
					) : (
						<div className={`${styles.empty} `}>Перетащите булку (вверх)</div>
					)}
				</li>

				<li
					ref={dropMiddle}
					className={`${styles.burger_main_list} ${isMainDragging ? styles.dropzone_active : ''} ${ingredients.length ? '' : 'pl-8'}`}>
					{ingredients.length ? (
						ingredients.map((item, i) => (
							<div key={item.uniqueId}>
								<BurgerConstructorItem
									item={item}
									index={i}
									moveItem={moveItem}
								/>
							</div>
						))
					) : (
						<div className={`${styles.empty} `}>Перетащите начинки и соусы</div>
					)}
				</li>

				<li
					ref={dropBunBottom}
					className={`${styles.constructor_bun_item} ${isBunDragging ? styles.dropzone_active : ''} pl-8`}>
					{bun ? (
						<BurgerConstructorItem
							type='bottom'
							item={bun}
							isLocked={true}
							index={0}
						/>
					) : (
						<div className={`${styles.empty} `}>Перетащите булку (низ)</div>
					)}
				</li>
			</ul>

			<BurgerConstructorFooter />
		</section>
	);
};
