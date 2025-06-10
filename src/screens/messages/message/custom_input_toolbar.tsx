import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import IconSend from '../../../assets/svgs/ic_Send';
import IconAdd from '../../../assets/svgs/ic_add';
import { useTheme } from '../../../hooks/useTheme';
import ModalOption from '../../../modals/modal_option';
import { useTranslation } from 'react-i18next';
import TypingAnimation from '../../../components/animation/isTypingAnimation';
import { RootState } from '../../../store/store';
import { TypingState } from '../../../store/reducers/conversationSlice';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../../hooks/useDebound';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { SEND_TYPING_EVENT } from '../../../store/middleware/socketMessageMiddleware';
import { useAppState } from '../../../hooks/useAppState';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  currentConv: string;
};

export const HEIGHT_INPUT_TOOLBAR = 60;

const CustomInputToolbar: React.FC<Props> = ({
                                               value,
                                               onChangeText,
                                               onSend,
                                               currentConv,
                                             }) => {
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const typingRoom = useSelector((state: RootState) => state.conv.conversationIsTyping);
  const [typingUsers, setTypingUsers] = useState<TypingState[]>([]);
  const appState = useAppState();
  const dispatch = useAppDispatch();
  const hasSentTyping = useRef(false);

  // Debounce sau 2s không gõ nữa → stop_typing
  const debouncedText = useDebounce(value, 4000);

  // Xử lý gửi typing/stop_typing
  const handleTyping = useCallback((event: 'typing' | 'stop_typing') => {
    dispatch({
      type: SEND_TYPING_EVENT,
      payload: {
        event,
        data: {
          conversationId: currentConv,
        },
      },
    });
    hasSentTyping.current = event === 'typing';
  }, [currentConv, dispatch]);



  // Gửi typing khi user bắt đầu gõ
  const onInputChange = (text: string) => {
    onChangeText(text);
    if (text.trim().length > 0 && !hasSentTyping.current) {
      handleTyping('typing');
    }
  };

  // Gửi stop_typing sau khi user ngừng gõ 4s
  useEffect(() => {

    if (hasSentTyping.current) {
      handleTyping('stop_typing');
    }
  }, [debouncedText, handleTyping]);

  // Gửi stop_typing khi rời app
  useEffect(() => {
    if (appState !== 'active' && hasSentTyping.current) {
      handleTyping('stop_typing');
    }
  }, [appState, handleTyping]);

  // Gửi stop_typing khi gửi tin nhắn
  const onSendPress = () => {
    onSend();
    if (hasSentTyping.current) {
      handleTyping('stop_typing');
    }
  };

  // Cập nhật người đang gõ trong cuộc trò chuyện hiện tại
  useEffect(() => {
    hasSentTyping.current = false; // reset mỗi lần chuyển conv
    const currentTyping = typingRoom.filter(typing => typing.conversationId === currentConv);
    setTypingUsers(currentTyping);

    return () => {
      if (hasSentTyping.current) {
        handleTyping('stop_typing');
      }
    };
  }, [currentConv, typingRoom, handleTyping]);

  return (
      <TouchableWithoutFeedback>
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          {typingUsers.length > 0 && (
              <View style={styles.typingContainer}>
                <TypingAnimation />
              </View>
          )}

          <TouchableOpacity
              style={[styles.addButton, { backgroundColor: theme.primary }]}
              onPress={() => setOptionModalVisible(true)}
          >
            <IconAdd color="#FFFFFF" />
          </TouchableOpacity>

          <TextInput
              value={value}
              onChangeText={onInputChange}
              placeholder={t('optionScreen.writeMessage')}
              placeholderTextColor="#ccc"
              style={[styles.input, { backgroundColor: theme.inputBar }]}
              onSubmitEditing={() => {
                onSendPress();
                Keyboard.dismiss();
              }}
          />

          <TouchableOpacity
              style={[styles.sendButton, { backgroundColor: theme.primary }]}
              onPress={onSendPress}
          >
            <IconSend color="#FFFFFF" />
          </TouchableOpacity>

          <ModalOption visible={optionModalVisible} onClose={() => setOptionModalVisible(false)} />
        </View>
      </TouchableWithoutFeedback>
  );
};

export default CustomInputToolbar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: HEIGHT_INPUT_TOOLBAR,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  addButton: {
    padding: 8,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  input: {
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    marginHorizontal: 10,
    color: 'white',
  },
  sendButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  typingContainer: {
    width: 100,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -30,
    left: 0,
  },
});
