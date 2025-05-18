import { Dimensions, Image, Text, View } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import React, {useEffect} from 'react';
import IconSeen from '../../../assets/svgs/icon_seen';
import { Message } from '../../../models/types';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface Props {
    currentMessage: Message;
}

const RenderItemMessage: React.FC<Props> = React.memo(({ currentMessage }) => {
    const theme = useTheme();
    const currentUser = 'u1';
    const isUserCurrent = currentMessage.sender.userId === currentUser;
    const images = currentMessage.link || [];
    const extraCount = images.length - 3;
    useEffect(() => {
        console.log(currentMessage)
    }, []);
    return (
        <View
            style={{
                alignSelf: isUserCurrent ? 'flex-end' : 'flex-start',
                backgroundColor: isUserCurrent
                    ? theme.backgroundMessageReceipt
                    : theme.backgroundMessageSend,
                padding: 8,
                marginVertical: 6,
                borderTopEndRadius: 16,
                borderTopStartRadius: 16,
                borderBottomStartRadius: 16,
                maxWidth: SCREEN_WIDTH * 0.7,
            }}>
            {/* Text */}
            {!!currentMessage.content && (
                <View style={{ marginBottom: images.length > 0 ? 8 : 0 }}>
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
                                    source={{ uri: link }}
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
                    {new Date(currentMessage.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </Text>
                {currentMessage.status === 'sent' && <IconSeen />}
            </View>
        </View>
    );
});

export default RenderItemMessage;
