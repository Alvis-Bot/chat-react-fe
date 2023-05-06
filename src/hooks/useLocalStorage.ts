import {useEffect, useMemo, useState} from 'react';

export default function useLocalStorage<T>(key: string, defaultValue: T) {
    const parsedValue = useMemo(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue === null ? defaultValue : JSON.parse(storedValue);
    }, [key, defaultValue]);
    const [value, setValue] = useState<T>(parsedValue);

    useEffect(() => {
        const listener = (e: StorageEvent) => {
            if (e.storageArea === localStorage && e.key === key) {
                setValue(JSON.parse(e.newValue!));
            }
        };
        window.addEventListener('storage', listener);

        return () => {
            window.removeEventListener('storage', listener);
        };
    }, []);

    const setValueInLocalStorage = (newValue: T | ((oldValue: T) => T)) => {
        setValue((currentValue) => {
            const result = typeof newValue === 'function' ? (newValue as (oldValue: T) => T)(currentValue) : newValue;
            const newValueStr = JSON.stringify(result);
            if (newValueStr !== JSON.stringify(currentValue)) {
                localStorage.setItem(key, newValueStr);
                return result;
            }
            return currentValue;
        });
    };


    return [value, setValueInLocalStorage] as const;
}
