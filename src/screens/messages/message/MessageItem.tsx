import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../../../hooks/useTheme';
import React, {useEffect, useState} from 'react';
import IconSeen from '../../../assets/svgs/icon_seen';
import {globalStyles} from '../../../styles/globalStyles';
import {useAuth} from '../../../hooks/useAuth';
import {Participant} from '../../../hooks/useParticipant';
import {Messages} from '../../../store/reducers/messageSlice';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useLocalizedDate} from '../../../hooks/useDateFromLocal';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface Props {
  currentMessage: Messages;
  participants: Participant[];
  index: number;
  onPress?: ({fullName, userId}) => void;
}

const RenderItemMessage: React.FC<Props> = React.memo(
  ({currentMessage, participants, index, onPress}) => {
    const {theme} = useTheme();
    const {user: currentUser} = useAuth();
    const senderId = currentMessage.senderId;
    const isUserCurrent = senderId == currentUser?.userId;
    const images = currentMessage.link || [];
    const extraCount = images.length - 3;
    const {formatTime} = useLocalizedDate();
    const [sender, setSender] = useState<Participant>();
    const duration = index * 150;
    useEffect(() => {
      if (!currentMessage) return;

      // Tìm participant có userId trùng senderId
      const participant = participants.find(
        u => u.userId === currentMessage.senderId,
      );

      setSender(participant);
    }, [participants, currentMessage]);

    return (
      <Animated.View entering={FadeInDown.duration(duration)}>
        {!isUserCurrent && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}>
            <TouchableOpacity
              onPress={() =>
                onPress?.({fullName: sender?.fullName, userId: senderId})
              }>
              <Image
                source={{uri: sender?.avatarUrl}}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                }}
              />
            </TouchableOpacity>
            <Text
              style={[
                globalStyles.smailSize,
                {
                  color: theme.text3,
                },
              ]}>
              {sender?.fullName}
            </Text>
          </View>
        )}
        <View
          style={{
            alignSelf: isUserCurrent ? 'flex-end' : 'flex-start',
            backgroundColor: isUserCurrent
              ? theme.backgroundMessageReceipt
              : theme.backgroundMessageSend,
            padding: 8,
            marginLeft: 34,
            marginVertical: 6,
            borderTopEndRadius: 16,
            borderTopStartRadius: isUserCurrent ? 16 : 0,
            borderBottomStartRadius: 16,
            borderBottomEndRadius: isUserCurrent ? 0 : 16,
            maxWidth: SCREEN_WIDTH * 0.7,
          }}>
          {/* Text */}
          {!!currentMessage.content && (
            <View style={{marginBottom: images.length > 0 ? 8 : 0}}>
              <Text
                style={{
                  color: isUserCurrent ? theme.textSend : theme.textReceipt,
                  fontSize: 16,
                }}>
                {currentMessage.content}
              </Text>
            </View>
          )}

          {/* Images */}
          {images.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
              }}>
              {images.slice(0, 3).map((link, index) => {
                const isLastImageWithExtra = index === 2 && extraCount > 0;
                return (
                  <View key={`${link}-${index}`}>
                    <Image
                      source={{uri: link}}
                      style={{
                        width: (SCREEN_WIDTH * 0.5) / 3,
                        height: 60,
                        borderRadius: 8,
                        margin: 4,
                      }}
                      resizeMode="cover"
                    />
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
                            fontSize: 22,
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

          {/* Time & Seen */}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              justifyContent: isUserCurrent ? 'flex-end' : 'flex-start',
            }}>
            <Text
              style={{
                fontSize: 12,
                color: isUserCurrent ? 'white' : 'black',
                marginTop: 4,
              }}>
              {formatTime(currentMessage.createdAt)}
            </Text>
            {currentMessage.status === 'sent' && (
              <IconSeen color={theme.iconColor} />
            )}
          </View>
        </View>
      </Animated.View>
    );
  },
);

export default RenderItemMessage;
