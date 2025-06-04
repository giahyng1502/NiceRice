import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useTheme} from '../../../hooks/useTheme';
import {formatDateOrTime} from '../../../utils/formatDate';
import Column from '../../../components/container/Column';
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {AppStackParamList} from "../../../navigation/AppNavigation";
import {Conversation} from "../../../store/reducers/conversationSlice";

interface Props {
  conversation: Conversation;
}
// 2. Khai báo kiểu navigation
type NavigationProps = NavigationProp<AppStackParamList, 'Messages'>;

const ConversationItem: React.FC<Props> = React.memo(({conversation}) => {
  const {theme} = useTheme();
  const {unreadCount, lastUpdatedAt} =
    conversation;
  const navigation = useNavigation<NavigationProps>();

  const displayName = conversation.participants?.[0]?.fullName || "no name";
  const avatarUrl = conversation.participants?.[0]?.avatarUrl || "";
  const lastMessagePreview = conversation.lastMessagePreview;
  const lastMessagePreviewColor = unreadCount > 0 ? theme.text2 : theme.text3
  const lastMessagePreviewWeight = unreadCount > 0 ? 'bold' : 'normal'
  return (
    <TouchableOpacity style={styles.container} onPress={()=> {
        navigation.navigate('MessageDetail', {
            id: conversation.conversationId
        });

    }}>
      {avatarUrl && <Image source={{uri: avatarUrl}} style={styles.avatar} />}
      <View style={styles.content}>
        <Text
          style={[
            styles.name,
            {
              color: theme.text2,
            },
          ]}>
          {displayName}
        </Text>
        <Text
          style={[
            styles.messagePreview,
            {
              color: lastMessagePreviewColor,
              fontWeight : lastMessagePreviewWeight
            },
          ]}
          numberOfLines={1}>
          {lastMessagePreview}
        </Text>
      </View>
      <Column
        styleCustom={{
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 10,
        }}>
        <Text style={styles.time}>{formatDateOrTime(lastUpdatedAt)}</Text>
        {unreadCount > 0 && (
          <View
            style={[
              styles.unreadBadge,
              {
                backgroundColor: theme.primary,
              },
            ]}>
            <Text style={styles.unreadText}>{unreadCount}</Text>
          </View>
        )}
      </Column>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    height: 80,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  messagePreview: {
    marginTop: 4,
    fontSize: 14,
  },
  unreadBadge: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  unreadText: {
    color: 'white',
    fontSize: 14,
  },
  time: {
    marginLeft: 8,
    fontSize: 14,
    color: '#999',
  },
});

export default ConversationItem;
