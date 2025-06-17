import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './authPages.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '@/services/api/auth-api';

export function ForgotPasswordPage() {
	const [email, setEmail] = useState('');
	const [forgotPassword, { isSuccess, isLoading, isError }] =
		useForgotPasswordMutation();

	const navigate = useNavigate();

	const handleNavigate = useCallback((route: string) => {
		navigate(route);
	}, []);

	useEffect(() => {
		if (isError) {
			console.error(
				'Ошибка восстановления пароля. Проверьте введенные данные.'
			);
			return;
		}
		if (isSuccess) {
			sessionStorage.setItem('resetAllowed', 'true');
			navigate('/reset-password');
		}
	}, [isSuccess, isError, navigate]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (isLoading) {
			return;
		}
		await forgotPassword({ email });
	};

	return (
		<main className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.form}>
					<h3 className={styles.header}>Восстановление пароля</h3>
					<Input
						type='text'
						placeholder='Укажите E-mail'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<Button htmlType='submit' type='primary' size='medium'>
						Восстановить
					</Button>
				</div>
			</form>
			<div className={styles.footer}>
				<div className={styles.footer_item}>
					<span>Вспомнили пароль?</span>
					<Button
						htmlType='button'
						type='secondary'
						size='large'
						style={{ padding: '0' }}
						onClick={() => handleNavigate('/login')}>
						Войти
					</Button>
				</div>
			</div>
		</main>
	);
}
