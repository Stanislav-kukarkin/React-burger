import React from 'react';
import styles from './tab-panel.module.css';
import { TIngredientType } from '@utils/types.ts';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

type TabPanelProps = {
	activeType: TIngredientType;
	setActiveType: (type: TIngredientType) => void;
};

export const TabPanel = ({
	activeType,
	setActiveType,
}: TabPanelProps): React.JSX.Element => {
	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					<Tab
						value={TIngredientType.Bun}
						active={activeType === TIngredientType.Bun}
						onClick={() => setActiveType(TIngredientType.Bun)}>
						Булки
					</Tab>
					<Tab
						value={TIngredientType.Main}
						active={activeType === TIngredientType.Main}
						onClick={() => setActiveType(TIngredientType.Main)}>
						Начинки
					</Tab>
					<Tab
						value={TIngredientType.Sauce}
						active={activeType === TIngredientType.Sauce}
						onClick={() => setActiveType(TIngredientType.Sauce)}>
						Соусы
					</Tab>
				</ul>
			</nav>
		</section>
	);
};
