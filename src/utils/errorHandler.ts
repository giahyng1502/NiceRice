// utils/errorHandler.ts
import {
    getCrashlytics,
    log,
    recordError,
    setUserId as setCrashUserId,
    setAttribute,
    setAttributes,
    crash, didCrashOnPreviousExecution,
} from '@react-native-firebase/crashlytics';

const crashlytics = getCrashlytics();

/**
 * Ghi nhận lỗi quan trọng vào Firebase Crashlytics
 * @param context - Mô tả nơi xảy ra lỗi
 * @param error - Đối tượng lỗi
 * @param attributes - Các thông tin phụ trợ
 */
export async function logCriticalError(
    context: string,
    error: unknown, // dùng unknown để rõ ràng hơn
    attributes: Record<string, string> = {}
) {
    // Luôn log context
    log(crashlytics, `[ERROR] ${context}`);

    // Ghi attributes nếu có
    if (attributes && typeof attributes === 'object') {
        await setAttributes(crashlytics, attributes);
    }

    // Nếu là Error thì ghi
    if (error instanceof Error) {
        recordError(crashlytics, error);
    } else {
        // Chuyển dạng khác sang Error
        const wrappedError = new Error(typeof error === 'string' ? error : JSON.stringify(error));
        recordError(crashlytics, wrappedError);
    }
}

/**
 * Ghi log thông tin (không gửi crash report)
 * @param message - Nội dung log
 * @param attributes - Thông tin phụ trợ
 */
export async function logInfo(message: string, attributes: Record<string, string> = {}) {
    log(crashlytics, `[INFO] ${message}`);
    await setAttributes(crashlytics, attributes);
}

/**
 * Gán userId cho Crashlytics
 */
export async function setUserId(userId: string) {
    await setCrashUserId(crashlytics, userId);
}

/**
 * Crash ứng dụng để test (Native crash)
 */
export function forceCrash() {
    console.log('Forcing app crash for testing...');
    crash(crashlytics);
}
export async function checkIfRecoveredFromCrash() {

    const didCrash = await didCrashOnPreviousExecution(crashlytics);

    if (didCrash) {
        log(crashlytics, 'App crashed in previous session');
        await setAttribute(crashlytics, 'recoveredFromCrash', 'true');
    }
}
