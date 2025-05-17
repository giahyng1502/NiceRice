import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  GiftedChat,
  IMessage,
  Composer,
} from 'react-native-gifted-chat';
import {fakeMessages} from '../../../models/fakeData';
import {Message} from '../../../models/types';
import {useTheme} from '../../../hooks/useTheme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/AppNavigation';
import IconSend from '../../../assets/svgs/ic_Send';
import IconAdd from '../../../assets/svgs/ic_add';
import RenderBubble from "./custom_bubble";

type Props = NativeStackScreenProps<RootStackParamList, 'MessageDetail'>;

const MessageDetail: React.FC<Props> = ({route}) => {
  const {id} = route.params;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const theme = useTheme();

  // Map data từ model sang GiftedChat IMessage chuẩn
  const mapToGiftedChat = (msgs: Message[]): IMessage[] => {
    return msgs
      .map(msg => ({
        _id: msg.messageId,
        text: msg.content,
        createdAt: new Date(msg.timestamp),
        user: {
          _id: msg.sender?.userId ?? 'unknown',
          name: msg.sender?.username ?? 'Unknown',
          avatar: msg.sender?.avatarUrl ?? undefined,
        },
        link: msg.link,
        [msg.status]: true,
      }))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  };

  useEffect(() => {
    const filteredMessages = fakeMessages.filter(m => m.conversationId === id);
    setMessages(mapToGiftedChat(filteredMessages));
  }, [id]);

  // Gửi tin nhắn mới
  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  }, []);
  // Custom thanh input + nút add + nút send
  const CustomInputToolbar = (props: any) => {
    const {text, onSend} = props;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.background,
          paddingHorizontal: 10,
          paddingVertical: 5,
          height: 70,
          borderTopEndRadius: 32,
          borderTopStartRadius: 32,
        }}>
        {/* Nút Add bên trái */}
        <TouchableOpacity
          style={{
            padding: 8,
            backgroundColor: 'gray',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
            height: 40,
          }}
          onPress={() => {
            // Xử lý thêm file, ảnh, emoji, v.v.
            console.log('Add button pressed');
          }}>
          <IconAdd color={theme.primary} />
        </TouchableOpacity>

        {/* Input text */}
        <Composer
          {...props}
          textInputStyle={{
            color: theme.text2,
            fontSize: 16,
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: 'gray',
            borderRadius: 8,
            flex: 1,
            marginHorizontal: 10,
            minHeight: 45,
            maxHeight: 50,
          }}
          placeholder="Nhập tin nhắn..."
        />

        {/* Nút Send bên phải */}
        <TouchableOpacity
          style={{
            marginRight: 10,
            backgroundColor: theme.primary,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
          }}
          onPress={() => {
            if (text && text.trim().length > 0) {
              onSend({text: text.trim()}, true);
            }
          }}>
          <IconSend />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundMessage,
        },
      ]}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 'u1', // id user hiện tại, bạn thay thế theo logic app
        }}
        renderBubble={RenderBubble}
        renderInputToolbar={CustomInputToolbar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default MessageDetail;
