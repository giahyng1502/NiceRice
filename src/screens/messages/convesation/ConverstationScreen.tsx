import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import CustomHeader from '../../../navigation/CustomHeader';
import {useTheme} from '../../../hooks/useTheme';
import ConversationItem from './converstation_item';
import {useConversation} from '../../../hooks/useConversation';
import SkeletonConversationItem from "../../../components/skeleton/SkeletonConversation";

const ConversationScreen = () => {
  const scrollY = useSharedValue(0);
  const {conversations,loading} = useConversation();
    const scrollHandler = useAnimatedScrollHandler(event => {
      scrollY.value = event.contentOffset.y;
    });

  const {theme} = useTheme();

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <CustomHeader scrollY={scrollY} theme={theme} />
      {
        loading && conversations.length > 0 ? (
            <SkeletonConversationItem repeat={10} />
        ) : (
            conversations.length > 0 && (
                <Animated.FlatList
                    data={conversations}
                    keyExtractor={(item, index) => `conv${item.conversationId}-${index}`}
                    renderItem={({ item }) => <ConversationItem conversation={item} />}
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                    contentContainerStyle={{ paddingTop: 20 }}
                />
            )
        )
      }

    </View>
  );
};

export default ConversationScreen;
