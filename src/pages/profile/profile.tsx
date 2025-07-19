import {
	NavLink,
	Route,
	Routes,
	useMatch,
	useNavigate,
} from 'react-router-dom';
import { ProfileFormPage } from './profile-form-page/profile-form';
import styles from './profile.module.css';
import { useLogoutMutation } from '@/services/api/auth-api';
import { useEffect } from 'react';
import { clearTokens } from '@/utils/token-utils';
import { HistoryPage } from './history-page/history-page';

export const ProfilePage = () => {
	const navigate = useNavigate();
	const [logout, { isSuccess, isLoading, isError }] = useLogoutMutation();
	const isOrdersPage = useMatch('/profile/orders');

	useEffect(() => {
		if (isError) {
			console.error('Ошибка логаута. ');
			return;
		}

		if (isSuccess) {
			clearTokens();
			navigate('/');
		}
	}, [isSuccess, isError, navigate]);

	const handleLogout = async (event: React.FormEvent) => {
		event.preventDefault();
		if (isLoading) {
			return;
		}
		await logout();
	};

	return (
		<div className={styles.container}>
			<div>
				<ul className={`${styles.menu_list} mb-20'`}>
					<li className={`${styles.menu_item} ${styles.active}`}>
						<NavLink
							to='/profile'
							end
							className={({ isActive }) =>
								`${styles.menu_item} ${isActive ? styles.active : ''}`
							}>
							Профиль
						</NavLink>
					</li>
					<li className={styles.menu_item}>
						{' '}
						<NavLink
							to='/profile/orders'
							className={({ isActive }) =>
								`${styles.menu_item} ${isActive ? styles.active : ''}`
							}>
							История заказов
						</NavLink>
					</li>
					<li className={styles.menu_item}>
						<button onClick={handleLogout} className={styles.menu_button}>
							Выход
						</button>
					</li>
				</ul>

				<span className={styles.left_side_description}>
					{isOrdersPage
						? 'В этом разделе вы можете просмотреть свою историю заказов'
						: 'В этом разделе вы можете изменить свои персональные данные'}
				</span>
			</div>

			<Routes>
				<Route index element={<ProfileFormPage />} />
				<Route path='orders' element={<HistoryPage />} />
			</Routes>
		</div>
	);
};
