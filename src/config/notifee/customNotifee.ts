// src/utils/customNotifee.ts
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

export const registerBackgroundNotificationHandler = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('📥 [Background] FCM:', remoteMessage);

        // Tạo channel nếu chưa có
        await notifee.createChannel({
            id: 'niceRice',
            name: 'Thông báo Chat',
            importance: AndroidImportance.HIGH,
        });

        // Hiển thị thông báo
        await notifee.displayNotification({
            title: remoteMessage.notification?.title || 'Tin nhắn mới',
            body: remoteMessage.notification?.body || 'Bạn có tin nhắn mới.',
            android: {
                channelId: 'niceRice',
                smallIcon: 'ic_launcher',
                pressAction: {
                    id: 'default',
                },
            },
        });
    });
};
