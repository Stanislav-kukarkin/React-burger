import React from 'react';
import styles from './app.module.css';
import { AppHeader } from '@components/app-header/app-header.tsx';

import { LoginPage } from '@/pages/authPages/login';
import { RegisterPage } from '@/pages/authPages/register';
import { ForgotPasswordPage } from '@/pages/authPages/forgot-password';
import { ResetPasswordPage } from '@/pages/authPages/reset-password';
import { HomePage } from '@/pages/home/home';
import { ProfilePage } from '@/pages/profile/profile';
import { Routes, useLocation, useNavigate, Route } from 'react-router-dom';
import { NotFoundPage } from '@/pages/notFound/not-found';
import { UnAuthProtectedRoute } from '../protected-route/unauth-protected-route';
import { AuthProtectedRoute } from '../protected-route/auth-protected-route';
import { ResetPasswordRoute } from '../protected-route/reset-password-protected-route';
import { IngredientInfo } from '../burger-ingredients/ingredient-info/ingredient-info';
import { Modal } from '../ui/modal/modal';

export const App = (): React.JSX.Element => {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.backgroundLocation;

	return (
		<div className={styles.app}>
			<AppHeader />
			<Routes location={background || location}>
				<Route path='*' element={<NotFoundPage />} />
				<Route path='/' element={<HomePage />} />
				<Route path='/ingredients/:id' element={<IngredientInfo isPage />} />
				<Route
					path='/register'
					element={
						<UnAuthProtectedRoute>
							<RegisterPage />
						</UnAuthProtectedRoute>
					}
				/>
				<Route
					path='/login'
					element={
						<UnAuthProtectedRoute>
							<LoginPage />
						</UnAuthProtectedRoute>
					}
				/>

				<Route
					path='/forgot-password'
					element={
						<UnAuthProtectedRoute>
							<ForgotPasswordPage />
						</UnAuthProtectedRoute>
					}
				/>
				<Route
					path='/reset-password'
					element={
						<ResetPasswordRoute>
							<UnAuthProtectedRoute>
								<ResetPasswordPage />
							</UnAuthProtectedRoute>
						</ResetPasswordRoute>
					}
				/>

				<Route
					path='/profile/*'
					element={
						<AuthProtectedRoute>
							<ProfilePage />
						</AuthProtectedRoute>
					}
				/>
			</Routes>

			{background && (
				<Routes>
					<Route
						path='/ingredients/:id'
						element={
							<Modal
								header='Детали ингредиента'
								isOpen={true}
								onClose={() => navigate('/')}>
								<IngredientInfo />
							</Modal>
						}
					/>
				</Routes>
			)}
		</div>
	);
};

export default App;
