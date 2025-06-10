import {useEffect, useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {fetchConversation} from '../store/action/conversationAction';
import {useAppDispatch} from './useAppDispatch';
import Realm from 'realm';
import {getRealm} from '../realm/realm';
import {Conversation, setConv} from '../store/reducers/conversationSlice';
import {saveConv} from '../realm/service/conversation_service';
import {convertRealmConversation} from '../utils/convertRealmConversation';

export const useConversation = (): {
  conversations: any;
  loading: any;
  error: any;
  refresh: () => void;
} => {
  const dispatch = useAppDispatch();

  const conversations = useSelector(
    (state: RootState) => state.conv.conversations,
  );
  const loading = useSelector((state: RootState) => state.conv.loading);
  const error = useSelector((state: RootState) => state.conv.error);

  const [realmInstance, setRealmInstance] = useState<Realm | null>(null);

  // Khởi tạo Realm instance khi component mount
  useEffect(() => {
    const realm = getRealm();
    setRealmInstance(realm);
  }, []);

  // Lấy dữ liệu từ Realm và set vào Redux khi realmInstance sẵn sàng
  useEffect(() => {
    if (!realmInstance) return;

    const loadConvsFromRealm = () => {
      if (!realmInstance) return;

      // 1. Lấy 20 conversation mới nhất
      const allConvs = realmInstance
        .objects<Conversation>('Conversation')
        .sorted('lastUpdatedAt', true);

      const top20Convs = allConvs.slice(0, 20);

      // 2. Xóa những conversation không nằm trong top 20
      const convsToDelete = allConvs.slice(20);

      realmInstance.write(() => {
        realmInstance.delete(convsToDelete);
      });

      // 3. Cập nhật redux store với 20 conversation này
      const plainTop20Convs = top20Convs.map(convertRealmConversation);
      dispatch(setConv(plainTop20Convs));
    };

    loadConvsFromRealm();
  }, [realmInstance, dispatch]);

  // Fetch data từ server và lưu vào Realm
  const getConvsFromServer = useCallback(async () => {
    if (!realmInstance) {
      console.warn('Realm instance chưa sẵn sàng!');
      return;
    }

    try {
      const data = await dispatch(fetchConversation()).unwrap();
      console.log('Data from server:', data);

      if (data.length === 0) {
        console.log('Không có dữ liệu mới');
      } else {
        console.log('Có dữ liệu mới:', data.length);
        saveConv(data, realmInstance);
      }
    } catch (error) {
      console.error('Lỗi khi fetch:', error);
    }
  }, [realmInstance, dispatch]);

  // Fetch dữ liệu ngay khi Realm sẵn sàng
  useEffect(() => {
    if (realmInstance) {
      getConvsFromServer();
    }
  }, [realmInstance, getConvsFromServer]);

  // Hàm refresh từ server
  const refresh = useCallback(() => {
    getConvsFromServer();
  }, [getConvsFromServer]);

  return {conversations, loading, error, refresh};
};
