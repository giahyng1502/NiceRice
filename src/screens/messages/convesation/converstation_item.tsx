import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useTheme} from '../../../hooks/useTheme';
import Column from '../../../components/container/Column';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '../../../navigation/AppNavigation';
import {
  Conversation,
  TypingState,
} from '../../../store/reducers/conversationSlice';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import TypingAnimation from '../../../components/animation/isTypingAnimation';
import {useTranslation} from 'react-i18next';
import {useLocalizedDate} from '../../../hooks/useDateFromLocal';
import RenderGroupAvatar from '../message/renderGroupAvatar';

interface Props {
  conversation: Conversation;
}

type NavigationProps = NavigationProp<AppStackParamList, 'Messages'>;

const ConversationItem: React.FC<Props> = ({conversation}) => {
  const {theme} = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const {t} = useTranslation();
  const participants: any[] = conversation?.participants || [];
  const isGroup = conversation.isGroup;
  const displayName = !isGroup
    ? participants?.[0]?.fullName || `${t('except.disPlayName')}`
    : conversation.groupName ||
      `${participants.map(participant => participant.fullName).join(', ')}`;
  const avatarUrl = conversation.groupAvatar;
  const unreadCount = conversation?.unreadCount || 0;
  const lastUpdatedAt = conversation?.lastUpdatedAt;
  const {formatDate} = useLocalizedDate();
  const lastMessagePreview = conversation?.lastMessagePreview;
  const conversationId = conversation?.conversationId;

  const typingRoom = useSelector(
    (state: RootState) => state.conv.conversationIsTyping,
  );

  const [typingUsers, setTypingUsers] = useState<TypingState[]>([]);

  useEffect(() => {
    const currentTyping = typingRoom.filter(
      typing => typing.conversationId === conversationId,
    );
    setTypingUsers(currentTyping);
  }, [conversationId, typingRoom]);

  const lastMessagePreviewStyle = {
    color: unreadCount > 0 ? theme.text2 : theme.text3,
    fontWeight: unreadCount > 0 ? 'bold' : 'normal',
  };
  if (!conversation.lastMessagePreview) {
    return null;
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('MessageDetail', {
          conversationId: conversationId,
          members: participants,
          isGroup: conversation.isGroup,
          groupName: conversation?.groupName,
          groupAvatar : conversation.groupAvatar
        });
      }}>
      {!avatarUrl ? (
        <RenderGroupAvatar
          participants={participants}
          styleAvatar={styles.avatar}
          containerStyle={styles.avatarContainer}
        />
      ) : (
        avatarUrl && <Image source={{uri: avatarUrl}} style={styles.avatar} />
      )}

      <View style={styles.content}>
        <Text style={[styles.name, {color: theme.text2}]}>{displayName}</Text>
        {typingUsers.length > 0 ? (
          <View style={styles.typingContainer}>
            <TypingAnimation />
          </View>
        ) : (
          <Text
            style={[styles.messagePreview, lastMessagePreviewStyle]}
            numberOfLines={1}>
            {lastMessagePreview}
          </Text>
        )}
      </View>

      <Column
        styleCustom={{
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 10,
        }}>
        <Text style={styles.time}>{formatDate(lastUpdatedAt)}</Text>
        {unreadCount > 0 && (
          <View style={[styles.unreadBadge, {backgroundColor: theme.primary}]}>
            <Text style={styles.unreadText}>{unreadCount}</Text>
          </View>
        )}
      </Column>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    height: 80,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  avatarContainer: {
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent : 'flex-start',
  },
  extraOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  extraText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
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
  typingContainer: {
    width: 100,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
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

export default React.memo(ConversationItem);
