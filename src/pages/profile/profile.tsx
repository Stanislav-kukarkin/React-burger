import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { ProfileFormPage } from './profile-form-page/profile-form';
import styles from './profile.module.css';
import { useLogoutMutation } from '@/services/api/auth-api';
import { useEffect } from 'react';
import { NotFoundPage } from '../notFound/not-found';
import { clearTokens } from '@/utils/token-utils';

export const ProfilePage = () => {
	const navigate = useNavigate();
	const [logout, { isSuccess, isLoading, isError }] = useLogoutMutation();

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
					В этом разделе вы можете изменить свои персональные данные
				</span>
			</div>

			<Routes>
				<Route index element={<ProfileFormPage />} />
				<Route path='orders' element={<NotFoundPage />} />
			</Routes>
		</div>
	);
};
