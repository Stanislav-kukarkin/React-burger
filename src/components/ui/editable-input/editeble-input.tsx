import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from 'react';

type EditableInputProps = {
	value: string;
	name: string;
	placeholder?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const EditableInput: React.FC<EditableInputProps> = ({
	value,
	name,
	placeholder = '',
	onChange,
}) => {
	const [isEditable, setIsEditable] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleIconClick = () => {
		setIsEditable(true);
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	};

	return (
		<Input
			type='text'
			placeholder={placeholder}
			onChange={onChange}
			icon='EditIcon'
			value={value}
			name={name}
			disabled={!isEditable}
			ref={inputRef}
			onIconClick={handleIconClick}
		/>
	);
};
