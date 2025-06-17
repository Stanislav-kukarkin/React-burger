import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

export function NotFoundPage() {
	return (
		<div className={styles.wrapper}>
			<div>
				<h1>Oops! 404 Error</h1>
				<p>The page you requested does not exist</p>
				<br />
				<br />
				<p>
					check the address or try{' '}
					<Link to='/' className={styles.link}>
						homepage
					</Link>
				</p>
			</div>
		</div>
	);
}
