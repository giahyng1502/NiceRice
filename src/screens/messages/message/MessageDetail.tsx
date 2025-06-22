import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Text, LayoutAnimation} from 'react-native';
import {useTheme} from '../../../hooks/useTheme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../../navigation/AppNavigation';

import {FlashList} from '@shopify/flash-list';
import RenderItemMessage from './MessageItem';
import CustomInputToolbar, {HEIGHT_INPUT_TOOLBAR} from './custom_input_toolbar';
import HeaderMessage from './HeaderMessage';
import Magin from '../../../components/margin/magin';
import {useConversationMessages} from '../../../hooks/useMessage';
import {useConversationParticipants} from '../../../hooks/useParticipant';
import {useTranslation} from 'react-i18next';
import {useBottomSheet} from '../../../modals/bottom_sheet_modal';
import BottomSheetConfirmViewProfile from '../../../modals/bottom_sheet_view_profile_member';

type Props = NativeStackScreenProps<AppStackParamList, 'MessageDetail'>;

const MessageDetail: React.FC<Props> = ({route, navigation}) => {
  const {conversationId, members, isGroup, groupName, groupAvatar} =
    route.params;
  const {groupedMessages, sendMessage} =
    useConversationMessages(conversationId);
  const [content, setContent] = useState<string>('');
  const {theme} = useTheme();
  const {t} = useTranslation();
  const {openBottomSheet, closeBottomSheet} = useBottomSheet();
  const {participants} = useConversationParticipants(conversationId);
  const displayName = !isGroup
    ? members?.[0]?.fullName || `${t('except.disPlayName')}`
    : groupName ||
      `${members.map(participant => participant.fullName).join(', ')}`;
  const handleBack = () => {
    navigation.goBack();
  };
  const handleChatOption = () => {
    const avatar = isGroup ? groupAvatar : members?.[0]?.avatarUrl;
    navigation.navigate('ChatOption', {
      isGroup: isGroup,
      displayName: displayName,
      avatar: avatar,
      conversationId: conversationId,
    });
  };
  const handleReport = ({fullName, userId}) => {
    openBottomSheet(
      <BottomSheetConfirmViewProfile
        fullName={fullName}
        navigation={navigation}
        onClose={closeBottomSheet}
        userId={userId}
      />,
      ['35%'], // snap points
      0, // index mặc định
    );
  };

  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => {
      if (item.type === 'header') {
        return (
          <View style={{alignItems: 'center', marginVertical: 8}}>
            <View style={{paddingHorizontal: 12, paddingVertical: 4}}>
              <Text style={{color: theme.text3, fontWeight: '600'}}>
                {item.date}
              </Text>
            </View>
          </View>
        );
      }

      return (
        <RenderItemMessage
          currentMessage={item.message}
          participants={participants}
          index={index}
          onPress={handleReport}
        />
      );
    },
    [participants, theme.text3],
  );

  const keyExtractor = useCallback((item: any, index: number) => {
    if (item.type === 'header') {
      return `header-${item.date}`;
    }
    return `msg-${item.message.messageId}`;
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}>
      <Magin top={1} />
      <HeaderMessage
        participant={members}
        handleBack={handleBack}
        groupAvatar={groupAvatar}
        handleChatOption={handleChatOption}
        title={displayName}
      />
      <FlashList
        data={groupedMessages}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={40}
        inverted
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{
          height: HEIGHT_INPUT_TOOLBAR,
        }}
      />

      <CustomInputToolbar
        value={content}
        onChangeText={setContent}
        currentConv={conversationId}
        onSend={() => {
          if (content && content.trim().length > 0) {
            setContent('');
            isGroup ? sendMessage(content, displayName) : sendMessage(content);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 15,
  },
});

export default MessageDetail;
