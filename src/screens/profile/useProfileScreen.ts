import {Config, CropConfig, openPicker} from '@baronha/react-native-multiple-image-picker';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import {PickerCropConfig} from "@baronha/react-native-multiple-image-picker/src/types/crop";

export const requestAndroidPermissions = async (t) => {
    if (Platform.OS !== 'android') return true;

    const sdkVersion = Platform.Version;

    if (sdkVersion >= 33) {
        const hasImagesPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        );
        const hasVideoPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        );

        if (hasImagesPermission && hasVideoPermission) return true;

        const result = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]);

        const deniedImages =
            result[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES];
        const deniedVideos =
            result[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO];

        // ✅ Nếu người dùng chọn "Never Ask Again"
        if (
            deniedImages === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
            deniedVideos === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
        ) {
            Alert.alert(
                t('granted.PhotoAccessRequired'),
                t('granted.ContentAccess'),
                [
                    {text: t('memberScreen.cancel'), style: 'cancel'},
                    {
                        text: t('granted.OpenSetting'),
                        onPress: () => Linking.openSettings(),
                    },
                ],
            );
            return false;
        }

        return (
            deniedImages === PermissionsAndroid.RESULTS.GRANTED &&
            deniedVideos === PermissionsAndroid.RESULTS.GRANTED
        );
    } else {
        const hasStorage = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );

        if (hasStorage) return true;

        const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );

        if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            Alert.alert(
                t('granted.PhotoAccessRequired'),
                t('granted.ContentAccess'),
                [
                    {text: t('memberScreen.cancel'), style: 'cancel'},
                    {
                        text: t('granted.OpenSetting'),
                        onPress: () => Linking.openSettings(),
                    },
                ],
            );
            return false;
        }

        return result === PermissionsAndroid.RESULTS.GRANTED;
    }
};


/**
 * Hook xử lý mở picker chọn ảnh với crop
 * @param lang Ngôn ngữ ('en', 'vi'...)
 * @param themeType Giao diện sáng/tối ('light' | 'dark')
 * @param theme Theme object (chứa màu nền, màu chữ...)
 * @param t Hàm dịch i18n
 */
const useCamera = (lang: string, themeType: 'dark' | 'light', theme: any, t: Function) => {
    // ✅ Cấu hình crop ảnh
    const cropConfig: PickerCropConfig = {
        circle: true,
        ratio: [{ title: 'Avatar', width: 1, height: 1 }],
    };

    // ✅ Cấu hình openPicker
    const config: Config = {
        crop: cropConfig,
        mediaType: 'image',
        selectMode: 'single',
        numberOfColumn: 4,
        primaryColor: '#FB9300',
        backgroundDark: theme.background,
        selectBoxStyle: 'number',
        isHiddenOriginalButton: false,
        theme: themeType,
        language: lang,
    };

    // ✅ Mở picker sau khi cấp quyền
    const onPicker = async () => {
        const hasPermission = await requestAndroidPermissions(t);

        if (!hasPermission) {
            console.warn('Permission denied: Không có quyền truy cập ảnh/video');
            return;
        }

        try {
            const response = await openPicker(config);

            if (response && response.length > 0) {
                console.log('Ảnh đã chọn và crop:', response);
                return response; // trả về 1 ảnh đã chọn
            }

            return null;
        } catch (e) {
            console.warn('Lỗi khi mở thư viện ảnh:', e);
            return null;
        }
    };

    return { onPicker };
};

export default useCamera;
