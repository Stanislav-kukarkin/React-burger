import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './authPages.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useResetPasswordMutation } from '@/services/api/auth-api';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@/hooks/useForm';
import { IResetPasswordConfirmRequest } from '@/interfaces/auth';

export function ResetPasswordPage() {
	const { values, handleChange } = useForm<IResetPasswordConfirmRequest>({
		token: '',
		password: '',
	});
	// const [password, setPassword] = useState('');
	// const [token, setToken] = useState('');

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [resetPassword, { isSuccess, isLoading, isError }] =
		useResetPasswordMutation();

	const navigate = useNavigate();

	const onIconClick = useCallback(() => {
		setIsPasswordVisible((prev) => !prev);
	}, []);

	useEffect(() => {
		sessionStorage.removeItem('resetAllowed');
	}, []);

	useEffect(() => {
		if (isError) {
			console.error(
				'Ошибка восстановления пароля. Проверьте введенные данные.'
			);
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
		await resetPassword(values);
	};

	return (
		<main className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h3 className={styles.header}>Восстановление пароля</h3>
				<Input
					name='password'
					value={values.password}
					type={isPasswordVisible ? 'text' : 'password'}
					placeholder='Введите новый пароль'
					icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
					onIconClick={onIconClick}
					onChange={handleChange}
				/>
				<Input
					name='token'
					type='text'
					placeholder='Введите код из письма'
					value={values.token}
					onChange={handleChange}
				/>

				<Button htmlType='submit' type='primary' size='medium'>
					Сохранить
				</Button>
			</form>
			<div className={styles.footer}>
				<div className={styles.footer_item}>
					<span>Вспомнили пароль?</span>
					<Button
						htmlType='button'
						type='secondary'
						size='large'
						style={{ padding: '0' }}>
						Войти
					</Button>
				</div>
			</div>
		</main>
	);
}
