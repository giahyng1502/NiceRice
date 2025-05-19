import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Conversation, Participant} from '../../models/types';
import {useTheme} from '../../hooks/useTheme';
import Row from '../../components/container/Row';
import {getParticipantsByIds} from '../../models/fakeData';
import Column from '../../components/container/Column';
import {globalStyles} from '../../styles/globalStyles';
import {formatDateOrTime} from '../../utils/formatDate';

interface Props {
  conversation: Conversation;
}

const GroupItem: React.FC<Props> = React.memo(({conversation}) => {
  const participantDetail: Participant[] = getParticipantsByIds(
    conversation.participantIds,
  );
  const theme = useTheme();
  const extraCount = participantDetail.length - 3;
  return (
    <Row styleCustom={styles.row}>
      {/* Avatars */}
      {participantDetail?.length > 0 && (
        <View style={styles.avatarContainer}>
          {participantDetail.slice(0, 3).map((u, index) => {
            const isLastImageWithExtra = index === 2 && extraCount > 0;
            return (
              <View
                key={u.userId}
                style={[
                  styles.avatarWrapper,
                  {
                    marginLeft: index === 0 ? 0 : -25,
                    zIndex: participantDetail.length + index,
                    backgroundColor: 'white',
                  },
                ]}>
                <Image source={{uri: u.avatarUrl}} style={styles.avatar} />
                {isLastImageWithExtra && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      +{extraCount}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}

      {/* Group Info */}
      <Column styleCustom={styles.groupInfo}>
        <Text
          style={[
            globalStyles.contentSize,
            {color: theme.text2, fontWeight: '700'},
          ]}>
          {conversation.groupName}
        </Text>
        <Text style={[globalStyles.privewSize, {color: theme.text3}]}>
          {conversation.lastMessagePreview}
        </Text>
      </Column>

      {/* Time & Unread Badge */}
      <Column styleCustom={{alignItems: 'flex-end', gap: 10}}>
        <Text style={[globalStyles.privewSize, {color: theme.text3}]}>
          {formatDateOrTime(conversation.lastUpdated)}
        </Text>

        {conversation.unreadCount > 0 && (
          <View style={[styles.badge, {backgroundColor: theme.primary}]}>
            <Text style={[globalStyles.smailSize, {color: theme.text2}]}>
              {conversation.unreadCount}
            </Text>
          </View>
        )}
      </Column>
    </Row>
  );
});

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 15,
    gap: 10,
  },
  avatarContainer: {
    width: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 2,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    resizeMode: 'cover',
  },
  groupInfo: {
    flex: 1,
    gap: 8,
    alignItems: 'flex-start',
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 7,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GroupItem;
