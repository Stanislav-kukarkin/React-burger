import styles from './ingredients-img.module.css';

type Props = {
	src: string;
	index?: number;
	isLast?: boolean;
	hiddenCount?: number;
	overlap?: number;
	visibleImages?: string[];
};

const IngredientsImg = ({
	src,
	index = 0,
	isLast = false,
	hiddenCount = 0,
	overlap = 16,
	visibleImages = [],
}: Props) => {
	return (
		<div
			key={index}
			className={`${styles.imgWrapper} ${isLast ? styles.lastImgWrapper : ''}`}
			style={{
				marginLeft: index === 0 ? 0 : -overlap,
				zIndex: visibleImages.length - index,
			}}>
			<img src={src} alt={`img-${index}`} className={styles.img} />
			{isLast && <div className={styles.overlayText}>+{hiddenCount}</div>}
		</div>
	);
};

export default IngredientsImg;
