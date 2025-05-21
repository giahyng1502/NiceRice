import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '../../../hooks/useTheme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/AppNavigation';

import {FlashList} from '@shopify/flash-list';
import {
  fakeConversations,
  fakeMessages,
  getParticipantsByIds,
} from '../../../models/fakeData';
import {Message, Participant} from '../../../models/types';
import RenderItemMessage from './custom_bubble';
import CustomInputToolbar, {HEIGHT_INPUT_TOOLBAR} from './custom_input_toolbar';
import HeaderMessage from './HeaderMessage';
import Magin from '../../../components/margin/magin';

type Props = NativeStackScreenProps<RootStackParamList, 'MessageDetail'>;

const MessageDetail: React.FC<Props> = ({route, navigation}) => {
  const {id} = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState<string>('');
  const [participant, setParticipant] = useState<Participant>();
  const {theme} = useTheme();
  useEffect(() => {
    const currentMessage = fakeMessages.filter(
      msg => msg.conversationId === id,
    );
    setMessages(currentMessage);
    const participantIds = fakeConversations
      .find(msg => msg.conversationId === id)
      ?.participantIds.filter(p => p !== 'u1');

    if (participantIds && participantIds.length > 0) {
      const users = getParticipantsByIds(participantIds);
      setParticipant(users[0]);
    }
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };
  const handleChatOption = () => {
    navigation.navigate('ChatOption', {
      name: participant?.username || '',
      image: participant?.avatarUrl || '',
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundMessage,
        },
      ]}>
        <Magin top={1}/>
      <HeaderMessage
        handleBack={handleBack}
        handleChatOption={handleChatOption}
      />
      <FlashList
        data={messages}
        renderItem={({item}) => <RenderItemMessage currentMessage={item} />}
        keyExtractor={item => item.messageId}
        estimatedItemSize={40}
        inverted={true}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{
          height: HEIGHT_INPUT_TOOLBAR,
        }}
      />
      <CustomInputToolbar
        value={content}
        onChangeText={setContent}
        onSend={() => {
          if (content && content.trim().length > 0) {
            // Xử lý gửi tin nhắn ở đây
            console.log('Send:', content);
            setContent('');
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
