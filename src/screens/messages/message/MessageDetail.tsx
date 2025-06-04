import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '../../../hooks/useTheme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../../navigation/AppNavigation';

import {FlashList} from '@shopify/flash-list';
import RenderItemMessage from './custom_bubble';
import CustomInputToolbar, {HEIGHT_INPUT_TOOLBAR} from './custom_input_toolbar';
import HeaderMessage from './HeaderMessage';
import Magin from '../../../components/margin/magin';
import {useConversationMessages} from '../../../hooks/useMessage';
import {useConversationParticipants} from "../../../hooks/useParticipant";

type Props = NativeStackScreenProps<AppStackParamList, 'MessageDetail'>;

const MessageDetail: React.FC<Props> = ({route, navigation}) => {
  const {id} = route.params;
  const {messages ,sendMessage} = useConversationMessages(id);
  const [content, setContent] = useState<string>('');
  const {theme} = useTheme();
  const participants = useConversationParticipants(id);
  const handleBack = () => {
    navigation.goBack();
  };
  // const handleChatOption = () => {
  //   navigation.navigate('ChatOption', {
  //     name: participant?.fullName || '',
  //     image: participant?.avatarUrl || '',
  //   });
  // };

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
        data={messages}
        renderItem={({item}) => (
          <RenderItemMessage
            currentMessage={item}
            participants={participants}
          />
        )}
        keyExtractor={(item, index) => `ms${item.messageId}-${index}`}
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
            sendMessage(content);
              setContent('')
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
