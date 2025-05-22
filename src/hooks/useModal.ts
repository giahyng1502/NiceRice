import { useState, useCallback } from 'react';

export const useModal = <T extends string>() => {
    const [active, setActive] = useState<T | null>(null);

    const open = useCallback((name: T) => {
        setActive(name);
    }, []);

    const close = useCallback(() => {
        setActive(null);
    }, []);

    return { active, open, close };
};
