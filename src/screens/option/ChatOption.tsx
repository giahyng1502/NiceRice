import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import IconBack from '../../assets/svgs/icon_back';
import {FONT_SIZE, globalStyles, width} from '../../styles/globalStyles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Magin from '../../components/margin/magin';
import ItemOption from './OtionItem';
import IconGroup from '../../assets/svgs/ic_groups';
import IconCustomBackground from '../../assets/svgs/icon_custom_backgroup';
import IconColor from '../../assets/svgs/icon_custom_color';
import {useTranslation} from 'react-i18next';
import {AppStackParamList} from '../../navigation/AppNavigation';
import IconUpdateFull from '../../assets/svgs/ic_pen_edit_full';
import useCamera from '../profile/useProfileScreen';
import {guessLangFromLocale} from '../../utils/timeZoneFromLocal';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useBottomSheet} from '../../modals/bottom_sheet_modal';
import ModalAddMember from '../../modals/bottom_sheet_addGroup';
import {useConversationParticipants} from '../../hooks/useParticipant';

type Props = NativeStackScreenProps<AppStackParamList, 'ChatOption'>;

const ChatOptionScreen: React.FC<Props> = ({navigation, route}) => {
  const {isGroup, displayName, avatar, conversationId} = route.params;
  const {t, i18n} = useTranslation();
  const {participants} = useConversationParticipants(conversationId);

  const locale = i18n.language || 'en-US';
  const lang = guessLangFromLocale(locale);
  const {theme, themeType} = useTheme();
  const {onPicker} = useCamera(lang, themeType, theme, t);
  const dispatch = useAppDispatch();
  const [groupName, setGroupName] = useState<string>();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [avatarSelected, setAvatarSelected] = useState<string>('');
  const slideRight = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: slideRight.value}],
      opacity: interpolate(slideRight.value, [0, -100], [0, 1]),
    };
  });
  useEffect(() => {
    if (isSelected) {
      slideRight.value = withTiming(-100, {duration: 500});
    } else {
      slideRight.value = withTiming(0, {duration: 500});
    }
  }, [isSelected]);

  const handleAvatar = async () => {
    const res = await onPicker();
    // @ts-ignore
    const avatarSelect: string = res[0].path || '';
    setAvatarSelected(avatarSelect);
    console.log('avatar', avatar);
  };
  const handleBack = () => {
    navigation.goBack();
  };

    const handleMemberScreenGroup = () => {
        navigation.navigate('GroupChatMember',{
            conversationId : conversationId
        });
    };
  useEffect(() => {
    setGroupName(displayName);
    setAvatarSelected(avatar);
  }, [avatar, displayName]);

  useEffect(() => {
    if (avatarSelected !== avatar || groupName?.trim() !== displayName.trim()) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [avatar, avatarSelected, displayName, groupName]);


  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}>
      <Magin top={1} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <IconBack color={theme.iconColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.information}>
        <View
          style={{
            position: 'relative',
          }}>
          <Image source={{uri: avatar}} style={styles.image} />
          {isGroup && (
            <TouchableOpacity
              onPress={handleAvatar}
              style={{
                borderRadius: 100,
                width: width * 0.1,
                height: width * 0.1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.primary,
                position: 'absolute',
                top: 2,
                right: 2,
              }}>
              <IconUpdateFull color={theme.iconColor} />
            </TouchableOpacity>
          )}
        </View>
        {isGroup ? (
          <TextInput
            value={groupName}
            onChangeText={setGroupName}
            style={{
              color: theme.text2,
              fontSize: FONT_SIZE.customMedium,
              fontWeight: '900',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}
          />
        ) : (
          <Text
            style={[
              globalStyles.title,
              {
                color: theme.text2,
                fontWeight: 700,
              },
            ]}>
            {displayName}
          </Text>
        )}
      </View>
      <Magin bottom={2} />

      <View
        style={{
          height: 0.5,
          backgroundColor: 'gray',
        }}
      />
      <Magin top={2} />
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-start',
          minHeight: 200,
          alignItems: 'flex-start',
          gap: 10,
        }}>
          {isGroup && (
              <ItemOption
                  Icon={<IconGroup color={theme.iconColor} />}
                  title={t('optionScreen.seeChatMember')}
                  onPress={handleMemberScreenGroup}
              />
          )}
        <ItemOption
          Icon={<IconColor color={theme.iconColor} />}
          title={t('optionScreen.customColor')}
        />
        <ItemOption
          Icon={<IconCustomBackground color={theme.iconColor} />}
          title={t('optionScreen.customBackground')}
        />
        {isGroup && (
          <ItemOption
            Icon={<IconCustomBackground color={theme.iconColor} />}
            title={t('optionScreen.leaveGroup')}
          />
        )}
      </View>
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 50,
            right: -90,
          },
          animatedStyle,
        ]}>
        <TouchableOpacity
          disabled={!isSelected}
          style={{
            backgroundColor: theme.primary,
            elevation: 8,
            width: 120,
            height: 50,
            padding: 8,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: theme.text2,
              fontSize: FONT_SIZE.bodyLarge,
              fontWeight: 700,
            }}>
            {t('optionScreen.edit')}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  information: {
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 80,
    paddingTop: 15,
  },
});

export default ChatOptionScreen;
