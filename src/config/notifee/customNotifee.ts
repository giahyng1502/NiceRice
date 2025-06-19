import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

export const registerBackgroundNotificationHandler = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('📥 [Background] FCM:', remoteMessage);
        // @ts-ignore
        const { title, body } = remoteMessage.data;
        const channelId = await notifee.createChannel({
            id: 'niceRice',
            name: 'NiceRice Channel',
            sound: 'nicesound',
            importance: AndroidImportance.HIGH,
        });
        console.log('✅ Created notification channel:', channelId);

        await notifee.displayNotification({
            title: title || 'Tin nhắn mới',
            body: body || 'Bạn có tin nhắn mới.',
            android: {
                channelId,
                smallIcon: 'ic_launcher',
                pressAction: {
                    id: 'default',
                },
            },
        });
    });
};
