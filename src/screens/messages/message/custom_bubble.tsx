import {Dimensions, Image, Text, View} from "react-native";
import {useTheme} from "../../../hooks/useTheme";
import {BubbleProps} from "react-native-gifted-chat";
import React from "react";
import IconSeen from "../../../assets/svgs/icon_seen";
const SCREEN_WIDTH = Dimensions.get("window").width;
const RenderBubble = (props: BubbleProps<any>) => {
    const theme = useTheme();
    const { currentMessage } = props;

    if (!currentMessage) return null;

    const images = currentMessage.link || [];
    const extraCount = images.length - 3;
    const isUserCurrent = currentMessage.user._id === 'u1' ? true : false;
    return (
        <View
            style={{
                alignSelf: isUserCurrent ? 'flex-end' : 'flex-start',
                backgroundColor:
                    currentMessage.user._id === 'u1'
                        ? theme.backgroundMessageReceipt
                        : theme.backgroundMessageSend,
                padding: 8,
                marginVertical: 6,
                borderTopEndRadius : 16,
                borderTopStartRadius : 16,
                borderBottomStartRadius : 16,
                maxWidth: SCREEN_WIDTH * 0.7,
            }}>
            {/* Text */}
            {currentMessage.text?.length > 0 && (
                <View style={{ marginBottom: images.length > 0 ? 8 : 0 }}>
                    <Text
                        style={{
                            color:
                                currentMessage.user._id === 'u1'
                                    ? theme.textSend
                                    : theme.textReceipt,
                            fontSize: 16,
                        }}>
                        {currentMessage.text}
                    </Text>
                </View>
            )}

            {/* Ảnh */}
            {images.length > 0 && (
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                    }}>
                    {images.slice(0, 3).map((link: string, index: number) => (
                        <View key={index}>
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
                            {/* Overlay nếu là ảnh cuối và có thêm ảnh */}
                            {index === 2 && extraCount > 0 && (
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
                    ))}
                </View>
            )}
            <View style={{
                width : '100%',
                flexDirection : 'row',
                alignItems : 'center',
                gap : 10,
                justifyContent : isUserCurrent ? 'flex-end' : 'flex-start'
            }}>
                <Text style={{
                    fontSize: 12, color: isUserCurrent ? 'white' : 'black',
                    marginTop: 4,
                }}>
                    {currentMessage.createdAt.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </Text>
                {
                    !currentMessage.sent ? <IconSeen /> : null
                }
            </View>
        </View>
    );
};
export default RenderBubble
