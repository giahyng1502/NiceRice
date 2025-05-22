import React from 'react';
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
import IconLogout from '../../assets/svgs/ic_logout';
import {globalStyles} from '../../styles/globalStyles';
import CustomHeader from '../../navigation/CustomHeader';
import {useSharedValue} from 'react-native-reanimated';
import Margin from '../../components/margin/magin';
import IconLanguage from '../../assets/svgs/icon_lang';
import IconMode from '../../assets/svgs/ic_mode';
import PoliceSheet from '../../modals/PoliceSheet';
import LanguageSheet from '../../modals/modal_selected_lang';
import {useModal} from '../../hooks/useModal';
import {useTranslation} from "react-i18next";

const MoreScreen = () => {
    const {theme} = useTheme();
    const scrollY = useSharedValue(0);

    const {active, open, close} = useModal<'language' | 'police'>();

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollY.value = event.nativeEvent.contentOffset.y;
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
                    onPress={() => open('language')}
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

                    onPress={() => open('police')}
                />
                <ItemOption
                    Icon={<IconHelpCenter color={theme.iconColor} />}
                    title={t('moreScreen.helpCenter')}

                />
            </ScrollView>
            <Margin bottom={2} />

            <PoliceSheet visible={active === 'police'} onClose={close} />
            <LanguageSheet visible={active === 'language'} onClose={close} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default MoreScreen;
