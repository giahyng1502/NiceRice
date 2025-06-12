import React, { createContext, useContext, useEffect, useState } from 'react';
import {openRealm} from "../realm/realm";

export const RealmContext = createContext<{ ready: boolean }>({ ready: false });

export const RealmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                await openRealm();
                console.log('✅ Realm đã mở');
                setReady(true);
            } catch (error) {
                console.error('❌ Lỗi mở Realm:', error);
            }
        };
        init();
    }, []);

    if (!ready) return null; // có thể thay bằng splash screen

    return <RealmContext.Provider value={{ ready }}>{children}</RealmContext.Provider>;
};


