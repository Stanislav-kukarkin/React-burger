import { ChangeEvent, useState } from 'react';

export function useForm<T>(initialValues: T) {
	const [values, setValues] = useState(initialValues);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	return { values, handleChange, setValues };
}
