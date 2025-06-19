import {Alert, Linking, Platform} from 'react-native';
import messaging, {
  getMessaging,
  getToken,
  onTokenRefresh,
} from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AuthorizationStatus,
} from '@notifee/react-native';
import axiosClient from '../apis/axios';
import {getApp} from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from "@react-native-firebase/crashlytics";
import {logCriticalError, logInfo} from "../utils/errorHandler";

const addTokenDrive = async (fcmToken: string) => {
  try {
    const storedToken = await AsyncStorage.getItem('fcmToken');
    if (storedToken === fcmToken) {
      return;
    }
    await axiosClient.post('/users/saveToken', {fcmToken});
    await AsyncStorage.setItem('fcmToken', fcmToken);
    logInfo('addTokenDrive');
  } catch (error) {
    logCriticalError('addTokenDrive', error);
    console.log('có lỗi xẩy ra khi lưu token',error);
  }
};

export async function requestNotifyPermissionWithConfirm(t: any) {
  try {
    // B1: Xin quyền thông báo
    const settings = await notifee.requestPermission();

    let isGranted =
      settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
      settings.authorizationStatus === AuthorizationStatus.PROVISIONAL;

    // B2: Nếu bị từ chối → hỏi lại
    if (!isGranted) {
      const userConfirmed = await new Promise<boolean>(resolve => {
        Alert.alert(
          t('granted.notification_request_title'),
          t('granted.notification_request_message'),
          [
            {
              text: t('granted.no'),
              onPress: () => resolve(false),
              style: 'cancel',
            },
            {text: t('granted.yes'), onPress: () => resolve(true)},
          ],
        );
      });

      if (!userConfirmed) {
        console.log('🚫 Người dùng từ chối xác nhận lại.');
        logInfo('Người dùng từ chối xác nhận lại.');

        return null;
      }

      // B3: Gọi lại requestPermission sau khi người dùng đồng ý
      const retrySettings = await notifee.requestPermission();

      isGranted =
        retrySettings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
        retrySettings.authorizationStatus === AuthorizationStatus.PROVISIONAL;

      // Nếu vẫn không được cấp quyền → đề nghị mở cài đặt
      if (!isGranted) {
        console.log('❌ Người dùng vẫn không cấp quyền sau lần thử lại.');
        logInfo('Người dùng vẫn không cấp quyền thông báo sau lần thử lại.');
        Alert.alert(
          t('granted.notification_blocked_title'),
          t('granted.notification_blocked_message'),
          [
            {text: t('granted.later'), style: 'cancel'},
            {
              text: t('granted.OpenSetting'),
              onPress: () => {
                if (Platform.OS === 'ios') {
                  Linking.openURL('app-settings:');
                } else {
                  Linking.openSettings();
                }
              },
            },
          ],
        );

        return null;
      }
    }

    const app = getApp(); // lấy app mặc định
    const messaging = getMessaging(app); // khởi tạo messaging modular

    const token = await getToken(messaging);
    console.log('📲 FCM Token:', token);

    // Gửi token lên server tại đây nếu cần
    await addTokenDrive(token);
    // Theo dõi token mới nếu Firebase làm mới
    onTokenRefresh(messaging, async newToken => {
      console.log('🔁 Token mới:', newToken);
      await addTokenDrive(newToken);
    });

    return token;
  } catch (error ) {
    console.log('Lỗi khi xin quyền thông báo:', error);
    logCriticalError('requestNotifyPermissionWithConfirm', error);
    return null;
  }
}
