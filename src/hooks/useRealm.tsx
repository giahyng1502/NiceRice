import { useEffect } from 'react';
import {initRealm} from "../realm/initRealm";

export const useInitRealm = () => {
    useEffect(() => {
        let isMounted = true;

        const openRealm = async () => {
            try {
                await initRealm();
                if (isMounted) {
                    console.log('Realm initialized');
                }
            } catch (error) {
                console.error('Failed to initialize Realm:', error);
            }
        };

        openRealm();

        return () => {
            isMounted = false;
        };
    }, []);
};
