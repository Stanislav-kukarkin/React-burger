import { useEffect, useState } from 'react';
import styles from './profile-form.module.css';
import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
	useGetUserQuery,
	useUpdateUserMutation,
} from '@/services/api/user-api';
import { EditableInput } from '@/components/ui/editable-input/editeble-input';

export const ProfileFormPage = () => {
	const [isDirty, setIsDirty] = useState(false);
	const [name, setNameValue] = useState('');
	const [email, setEmailValue] = useState('');
	const [password, setPasswordValue] = useState('');
	const [initialName, setInitialName] = useState('');
	const [initialEmail, setInitialEmail] = useState('');
	const { data, isLoading } = useGetUserQuery();
	const [
		updateUser,
		{
			isLoading: isUpdating,
			isError: isErrorUpdating,
			isSuccess: isSuccesUpdating,
		},
	] = useUpdateUserMutation();

	useEffect(() => {
		if (data) {
			setInitialName(data.user.name);
			setInitialEmail(data.user.email);
			setNameValue(data.user.name);
			setEmailValue(data.user.email);
		}
	}, [data]);

	useEffect(() => {
		if (isErrorUpdating) {
			console.error('Ошибка обновления профиля. Проверьте введенные данные.');
			return;
		}

		if (isSuccesUpdating) {
			setPasswordValue('');
			setInitialName(name);
			setInitialEmail(email);
			setIsDirty(false);
		}
	}, [updateUser, isErrorUpdating, isSuccesUpdating]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (isUpdating) {
			return;
		}
		await updateUser({ email, password, name });
	};

	if (isLoading) return <p>Загрузка данных...</p>;

	return (
		<form className={styles.container} onSubmit={handleSubmit}>
			<EditableInput
				onChange={(e) => {
					setNameValue(e.target.value);
					setIsDirty(true);
				}}
				value={name}
				name={'name'}
				placeholder='Имя'
			/>

			<EmailInput
				onChange={(e) => {
					setEmailValue(e.target.value);
					setIsDirty(true);
				}}
				value={email}
				name={'email'}
				placeholder='Логин'
				isIcon={true}
			/>

			<PasswordInput
				onChange={(e) => {
					setPasswordValue(e.target.value);
					setIsDirty(true);
				}}
				value={password}
				name={'password'}
				icon='EditIcon'
			/>

			{isDirty && (
				<div className={styles.buttonContainer}>
					<Button
						htmlType='button'
						size='small'
						type='secondary'
						onClick={() => {
							setNameValue(initialName);
							setEmailValue(initialEmail);
						}}>
						Отмена
					</Button>
					<Button htmlType='submit' size='small' type='primary'>
						Сохранить
					</Button>
				</div>
			)}
		</form>
	);
};
