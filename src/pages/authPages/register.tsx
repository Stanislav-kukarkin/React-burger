import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './authPages.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '@/services/api/auth-api';
import { useForm } from '@/hooks/useForm';
import { IRegisterRequest } from '@/interfaces/auth';

export function RegisterPage() {
	const { values, handleChange } = useForm<IRegisterRequest>({
		email: '',
		password: '',
		name: '',
	});

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
		await register(values);
	};

	return (
		<main className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h3 className={styles.header}>Регистрация</h3>

				<Input
					name='name'
					type='text'
					placeholder='Имя'
					value={values.name}
					onChange={handleChange}
				/>
				<Input
					name='email'
					type='text'
					placeholder='E-mail'
					value={values.email}
					onChange={handleChange}
				/>
				<Input
					name='password'
					type={isPasswordVisible ? 'text' : 'password'}
					placeholder='Пароль'
					value={values.password}
					icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
					onIconClick={onIconClick}
					onChange={handleChange}
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
