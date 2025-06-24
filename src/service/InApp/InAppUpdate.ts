import { Platform } from 'react-native';
import SpInAppUpdates, {
    IAUUpdateKind,
    StartUpdateOptions,
} from 'sp-react-native-in-app-updates';
import {logCriticalError} from "../../utils/errorHandler";

const inAppUpdates = new SpInAppUpdates(false); // false = tắt debug logs

export async function checkAndUpdateApp() {
    if (Platform.OS !== 'android') return;

    try {
        const result = await inAppUpdates.checkNeedsUpdate({
            curVersion: '1.1.5',
        });

        if (result.shouldUpdate) {
            const updateOptions: StartUpdateOptions = {
                updateType: IAUUpdateKind.IMMEDIATE, // hoặc IMMEDIATE nếu cần update bắt buộc
            };

            await inAppUpdates.startUpdate(updateOptions);
        }
    } catch (error) {
        logCriticalError('Lỗi cập nhật ứng dụng:',error)
        console.warn('Lỗi cập nhật ứng dụng:', error);
    }
}
