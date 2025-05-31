import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Conversation} from '../../../models/types';
import {getParticipantsByIds} from '../../../models/fakeData';
import {useTheme} from '../../../hooks/useTheme';
import {formatDateOrTime} from '../../../utils/formatDate';
import Column from '../../../components/container/Column';
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {MainTabParamList} from "../../../navigation/BottomNavigation";

interface Props {
  conversation: Conversation;
}
// 2. Khai báo kiểu navigation
type NavigationProps = NavigationProp<MainTabParamList, 'Messages'>;

const ConversationItem: React.FC<Props> = React.memo(({conversation}) => {
  const {theme} = useTheme();
  const {lastMessagePreview, unreadCount, updatedAt} =
    conversation;
  const navigation = useNavigation<NavigationProps>();

  const displayName = conversation.users?.[0]?.fullName || "no name";
  const avatarUrl = conversation.users?.[0]?.avatarUrl || "";

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
              color: theme.text3,
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
        <Text style={styles.time}>{formatDateOrTime(updatedAt)}</Text>
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
