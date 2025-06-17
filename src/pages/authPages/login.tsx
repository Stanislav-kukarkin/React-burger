import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './authPages.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/services/api/auth-api';

export function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	const [login, { isSuccess, isLoading, isError }] = useLoginMutation();

	const onIconClick = useCallback(() => {
		setIsPasswordVisible((prev) => !prev);
	}, []);

	const handleNavigate = useCallback((route: string) => {
		navigate(route);
	}, []);

	useEffect(() => {
		if (isError) {
			console.error('Ошибка авторизации. Проверьте введенные данные.');
			return;
		}

		if (isSuccess) {
			const from = location.state?.from?.pathname || '/';
			navigate(from);
		}
	}, [isSuccess, isError, navigate]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (isLoading) {
			return;
		}
		await login({ email, password });
	};

	return (
		<main className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h3 className={styles.header}>Вход</h3>
				<Input
					type='text'
					placeholder='E-mail'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					type={isPasswordVisible ? 'text' : 'password'}
					placeholder='Пароль'
					value={password}
					icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
					onIconClick={onIconClick}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Button htmlType='submit' type='primary' size='large'>
					Войти
				</Button>
			</form>
			<div className={styles.footer}>
				<div className={styles.footer_item}>
					<span>Вы — новый пользователь?</span>
					<Button
						htmlType='button'
						type='secondary'
						size='small'
						style={{ padding: '0' }}
						onClick={() => handleNavigate('/register')}>
						Зарегистрироваться
					</Button>
				</div>
				<div className={styles.footer_item}>
					<span>Забыли пароль?</span>
					<Button
						htmlType='button'
						type='secondary'
						size='small'
						style={{ padding: '0' }}
						onClick={() => handleNavigate('/forgot-password')}>
						Восстановить пароль
					</Button>
				</div>
			</div>
		</main>
	);
}
