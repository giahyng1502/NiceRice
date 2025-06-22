import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import ItemOption from '../option/OtionItem';
import IconGroup from '../../assets/svgs/ic_groups';
import IconMute from '../../assets/svgs/ic_mute';
import IconAbout from '../../assets/svgs/ic_about';
import IconHelpCenter from '../../assets/svgs/ic_help';
import CustomHeader from '../../navigation/CustomHeader';
import {useSharedValue} from 'react-native-reanimated';
import Margin from '../../components/margin/magin';
import IconLanguage from '../../assets/svgs/icon_lang';
import IconMode from '../../assets/svgs/ic_mode';
import {useTranslation} from "react-i18next";
import {useBottomSheet} from "../../modals/bottom_sheet_modal";
import PoliceSheet from "../../modals/PoliceSheet";
import LanguageSheet from "../../modals/modal_selected_lang";
import BottomSheetDeleteAccount from "../../modals/bottom_sheet_delete_account";
import ModalComfirmDeleteAccount from "../../modals/modalComfirmDeleteAccount";

const MoreScreen = () => {
    const {theme} = useTheme();
    const scrollY = useSharedValue(0);
    const [isComfirmDeleteAccount, setIsComfirmDeleteAccount] = useState(false)
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollY.value = event.nativeEvent.contentOffset.y;
    };

    const {openBottomSheet ,closeBottomSheet} = useBottomSheet();
    const openPoliceSheet = () => {
        openBottomSheet(
            <PoliceSheet
                onClose={() => closeBottomSheet()}
            />
            ,
            ['95%'], // snap points
            0 // index mặc định
        );
    };

    const openLanguageSheet = () => {
        openBottomSheet(
            <LanguageSheet
                onClose={() => closeBottomSheet()}
            />
            ,
            ['30%'], // snap points
            0 // index mặc định
        );
    };

    const openDeleteAccount = () => {
        openBottomSheet(
            <BottomSheetDeleteAccount
                onClose={() => closeBottomSheet()}
            />
            ,
            ['60%'], // snap points
            0 // index mặc định
        );
    };
    const {t} = useTranslation();
    return (
        <View style={[styles.container, {backgroundColor: theme.background}]}>
            <CustomHeader scrollY={scrollY} theme={theme} />
            <ScrollView
                onScroll={handleScroll}
                style={{
                    padding: 15,
                    flex: 1,
                }}>
                <ItemOption
                    Icon={<IconLanguage color={theme.iconColor} />}
                    title={t('lang.language')}
                    onPress={openLanguageSheet}
                />

                <ItemOption
                    Icon={<IconMode color={theme.iconColor} />}
                    title={t('moreScreen.darkMode')}
                    type={'switch'}
                />

                <ItemOption
                    Icon={<IconMute color={theme.iconColor} />}
                    title={t('moreScreen.muteNotification')}

                />

                <ItemOption
                    Icon={<IconGroup color={theme.iconColor} />}
                    title={t('moreScreen.inviteFriend')}
                />

                <ItemOption
                    Icon={<IconAbout color={theme.iconColor} />}
                    title={t('moreScreen.aboutApp')}

                    onPress={openPoliceSheet}
                />
                <ItemOption
                    Icon={<IconHelpCenter color={theme.iconColor} />}
                    title={t('moreScreen.helpCenter')}

                />
                <ItemOption
                    Icon={<IconHelpCenter color={theme.iconColor} />}
                    title={t('optionScreen.delete_account')}
                    onPress={openDeleteAccount}
                />
                <Margin bottom={4} />

            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default MoreScreen;
