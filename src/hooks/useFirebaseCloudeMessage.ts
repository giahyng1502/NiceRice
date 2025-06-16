import {useEffect} from 'react';
import {requestNotifyPermissionWithConfirm} from '../permisstion/notifyPermisstion';
import {useTranslation} from "react-i18next";

const useFirebaseCloudMessage = (userId: number |null) => {
  const {t} = useTranslation();

  useEffect(() => {
    if (!userId) return;

    const fetchToken = async () => {
      if (userId) {
        await requestNotifyPermissionWithConfirm(t);
      }
    };

    const timeout = setTimeout(()=>{
      fetchToken();
    },2000);
    return () => {
      clearTimeout(timeout)
    }
  }, [userId]);
};
export default useFirebaseCloudMessage;
