import React, {createContext, useContext, useEffect, useState} from 'react';
import Realm from 'realm';
import {getRealm} from '../realm/realm';
import {Text} from 'react-native';

type RealmContextType = {
  realm: Realm | null;
};

const RealmContext = createContext<RealmContextType>({realm: null});

export const RealmProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [realm, setRealm] = useState<Realm | null>(null);

  useEffect(() => {
    let mounted = true;
    getRealm()
      .then(r => {
        if (mounted) setRealm(r);
      })
      .catch(console.error);

    return () => {
      mounted = false;
      // Không đóng Realm ở đây
    };
  }, []);

  return (
    <RealmContext.Provider value={{realm}}>
      {realm ? children : <Text>Đang khởi tạo Realm...</Text>}
    </RealmContext.Provider>
  );
};

export const useRealm = (): Realm => {
  const context = useContext(RealmContext);
  if (!context.realm) {
    throw new Error('Realm chưa sẵn sàng hoặc chưa được khởi tạo');
  }
  if (context.realm.isClosed) {
    throw new Error('Realm đã bị đóng');
  }
  return context.realm;
};
