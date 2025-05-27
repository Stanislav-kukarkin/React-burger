import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TIngredient, TIngredientType } from '@utils/types.ts';
import { TabPanel } from './tab-panel/tab-panel';
import styles from './burger-ingredients.module.css';
import { BurgerIngredientsSegment } from './burger-ingridients-segment/burger-ingredients-segment';
import { GroupedIngredients } from '@/interfaces/ingrediensts';
import { Modal } from '../ui/modal/modal';
import { IngredientInfo } from './ingredient-info/ingredient-info';
import { useGetIngredientsQuery } from '../services/api/ingredients-api';

export const BurgerIngredients = (): React.JSX.Element => {
	const [activeType, setActiveType] = useState<TIngredientType>(
		TIngredientType.Bun
	);
	const [isModalOpen, setModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<TIngredient | null>(null);
	const [isTabClick, setIsTabClick] = useState(false);

	const bunRef = useRef<HTMLDivElement | null>(null);
	const mainRef = useRef<HTMLDivElement | null>(null);
	const sauceRef = useRef<HTMLDivElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const {
		data: ingredients,
		isLoading,
		isError,
		error,
	} = useGetIngredientsQuery();

	useEffect(() => {
		if (!isTabClick) return;

		const refs: Record<TIngredientType, React.RefObject<HTMLDivElement>> = {
			[TIngredientType.Bun]: bunRef,
			[TIngredientType.Main]: mainRef,
			[TIngredientType.Sauce]: sauceRef,
		};
		const ref = refs[activeType];
		ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

		setIsTabClick(false);
	}, [activeType]);

	const groupedIngredients: GroupedIngredients = useMemo(() => {
		if (!ingredients) {
			return {
				[TIngredientType.Bun]: [],
				[TIngredientType.Sauce]: [],
				[TIngredientType.Main]: [],
			};
		}

		return ingredients.reduce<Record<TIngredientType, TIngredient[]>>(
			(acc, item) => {
				if (!acc[item.type]) {
					acc[item.type] = [];
				}
				acc[item.type].push(item);
				return acc;
			},
			{
				[TIngredientType.Bun]: [],
				[TIngredientType.Sauce]: [],
				[TIngredientType.Main]: [],
			}
		);
	}, [ingredients]);

	const handleScroll = () => {
		const getTop = (
			item: React.MutableRefObject<HTMLDivElement | null>
		): number => Math.abs(item.current?.getBoundingClientRect().top ?? 0);

		const containerTop = getTop(containerRef);
		const sectionDistances: { type: TIngredientType; distance: number }[] = [
			{ type: TIngredientType.Bun, distance: getTop(bunRef) - containerTop },
			{ type: TIngredientType.Main, distance: getTop(mainRef) - containerTop },
			{
				type: TIngredientType.Sauce,
				distance: getTop(sauceRef) - containerTop,
			},
		];

		const closest = sectionDistances.reduce((prev, curr) =>
			curr.distance < prev.distance ? curr : prev
		);

		if (closest.type !== activeType) {
			setActiveType(closest.type);
		}
	};

	const handleClose = () => setModalOpen(false);
	const handleShow = (item: TIngredient) => {
		setSelectedItem(item);
		setModalOpen(true);
	};

	if (isLoading) return <p>Загрузка ингредиентов...</p>;
	if (isError) return <p>Ошибка загрузки: {String(error)}</p>;
	if (!ingredients) return <p>Нет данных</p>;

	return (
		<>
			<div className={`${styles.wrapper} pb-10 pt-10`}>
				<TabPanel
					activeType={activeType}
					setActiveType={(type) => {
						setIsTabClick(true);
						setActiveType(type);
					}}
				/>
				<div
					className={styles.burger_ingredients}
					ref={containerRef}
					onScroll={handleScroll}>
					<div ref={bunRef}>
						<BurgerIngredientsSegment
							ingredients={groupedIngredients[TIngredientType.Bun]}
							title='Булки'
							onItemClick={handleShow}
						/>
					</div>
					<div ref={mainRef}>
						<BurgerIngredientsSegment
							ingredients={groupedIngredients[TIngredientType.Main]}
							title='Начинки'
							onItemClick={handleShow}
						/>
					</div>
					<div ref={sauceRef}>
						<BurgerIngredientsSegment
							ingredients={groupedIngredients[TIngredientType.Sauce]}
							title='Соусы'
							onItemClick={handleShow}
						/>
					</div>
				</div>
			</div>
			{selectedItem && (
				<Modal
					header={<h3 className={styles.modal_header}>Детали ингредиента</h3>}
					isOpen={isModalOpen}
					onClose={handleClose}>
					<IngredientInfo item={selectedItem} />
				</Modal>
			)}
		</>
	);
};
