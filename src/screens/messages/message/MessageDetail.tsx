import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {useTheme} from '../../../hooks/useTheme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/AppNavigation';

import {FlashList} from '@shopify/flash-list';
import {fakeMessages} from '../../../models/fakeData';
import {Message} from '../../../models/types';
import RenderItemMessage from './custom_bubble';
import CustomInputToolbar, {HEIGHT_INPUT_TOOLBAR} from './custom_input_toolbar';

type Props = NativeStackScreenProps<RootStackParamList, 'MessageDetail'>;

const MessageDetail: React.FC<Props> = ({route}) => {
  const {id} = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState<string>('');
  const theme = useTheme();
  const listRef = useRef<FlashList<any>>(null);
  useEffect(() => {
    const currentMessage = fakeMessages.filter(
      msg => msg.conversationId === id,
    );
    setMessages(currentMessage);
    console.log(currentMessage);
    setTimeout(() => {
      listRef.current?.scrollToEnd({animated: false});
    }, 300); // đợi 1 chút cho list rende
  }, []);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundMessage,
        },
      ]}>
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
    padding: 15,
  },
});

export default MessageDetail;
