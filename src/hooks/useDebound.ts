import { useState, useEffect } from 'react';

/**
 * @param value Giá trị đầu vào muốn debounce (thường là input text)
 * @param delay Thời gian delay (ms), ví dụ 500-1000ms
 * @returns Giá trị đã debounce, chỉ update khi không thay đổi trong delay ms
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set timeout khi value thay đổi
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Clear timeout nếu value lại đổi trước khi hết delay
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
