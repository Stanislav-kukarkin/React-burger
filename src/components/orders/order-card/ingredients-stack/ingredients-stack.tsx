import React from 'react';
import styles from './ingredients-stack.module.css';
import IngredientsImg from '@/components/ui/ingredient-img/ingredients-img';

type Props = {
	images: string[];
	maxVisible?: number;
	size?: number;
	overlap?: number;
};

const IngredientsStack = ({
	images,
	maxVisible = 6,
	size = 64,
	overlap = 16,
}: Props) => {
	const visibleImages = images.slice(0, maxVisible);
	const hiddenCount = images.length - maxVisible;

	const styleWithCssVars: React.CSSProperties & { [key: string]: string } = {
		'--size': `${size}px`,
		'--overlap': `${overlap}px`,
	};

	return (
		<div className={styles.container} style={styleWithCssVars}>
			{visibleImages.map((src, index) => {
				const isLast = index === maxVisible - 1 && hiddenCount > 0;
				return (
					<IngredientsImg
						key={src + index}
						src={src}
						index={index}
						isLast={isLast}
						hiddenCount={hiddenCount}
						overlap={overlap}
						visibleImages={visibleImages}
					/>
				);
			})}
		</div>
	);
};

export default IngredientsStack;
