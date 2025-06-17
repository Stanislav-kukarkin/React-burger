import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './authPages.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '@/services/api/auth-api';

export function RegisterPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const navigate = useNavigate();
	const [register, { isSuccess, isLoading, isError }] = useRegisterMutation();

	const onIconClick = useCallback(() => {
		setIsPasswordVisible((prev) => !prev);
	}, []);

	const handleNavigate = useCallback((route: string) => {
		navigate(route);
	}, []);

	useEffect(() => {
		if (isError) {
			console.error('Ошибка регистрации. Проверьте введенные данные.');
			return;
		}

		if (isSuccess) {
			navigate('/login');
		}
	}, [isSuccess, isError, navigate]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (isLoading) {
			return;
		}
		await register({ name, email, password });
	};

	return (
		<main className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h3 className={styles.header}>Регистрация</h3>

				<Input
					type='text'
					placeholder='Имя'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
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

				<Button htmlType='submit' type='primary' size='medium'>
					Зарегистрироваться
				</Button>
			</form>
			<div className={styles.footer}>
				<div className={styles.footer_item}>
					<span>Уже зарегистрированы?</span>
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
