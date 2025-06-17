import { useEffect, useState } from 'react';

type StorageCallback = (
	newValue: string | null,
	oldValue: string | null
) => void;

//NOTE - Локально для себя, можно игнорировать

export function useLocalStorageListener(
	key: string,
	callback: StorageCallback
) {
	const [storedValue, setStoredValue] = useState<string | null>(() => {
		return localStorage.getItem(key);
	});

	useEffect(() => {
		function handleStorageChange(event: StorageEvent) {
			if (event.key === key) {
				callback(event.newValue, event.oldValue);
			}
		}

		window.addEventListener('storage', handleStorageChange);

		const currentValue = localStorage.getItem(key);
		if (currentValue !== storedValue) {
			callback(currentValue, storedValue);
			setStoredValue(currentValue);
		}

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, [key, storedValue, callback]);

	return storedValue;
}
