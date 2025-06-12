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

type Props = NativeStackScreenProps<AppStackParamList, 'MessageDetail'>;

const MessageDetail: React.FC<Props> = ({route, navigation}) => {
  const {id} = route.params;
  const {groupedMessages, sendMessage} = useConversationMessages(id);
  const [content, setContent] = useState<string>('');
  const {theme} = useTheme();
  const {participants} = useConversationParticipants(id);
  const handleBack = () => {
    navigation.goBack();
  };
  // const handleChatOption = () => {
  //   navigation.navigate('ChatOption', {
  //     name: participant?.fullName || '',
  //     image: participant?.avatarUrl || '',
  //   });
  // };

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
        />
      );
    },
    [participants, theme.text3],
  );

  const keyExtractor = useCallback((item: any, index: number) => {
    if (item.type === 'header') return `header-${item.date}`;
    return `msg-${item.message.messageId}`;
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundMessage,
        },
      ]}>
      <Magin top={1} />
      <HeaderMessage handleBack={handleBack} handleChatOption={() => {}} />
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
        currentConv={id}
        onSend={() => {
          if (content && content.trim().length > 0) {
            setContent('');
            sendMessage(content);
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
});

export default MessageDetail;
