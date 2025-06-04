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
import {Conversation} from "../../../store/reducers/conversationSlice";

const ConversationScreen = () => {
  const scrollY = useSharedValue(0);
  const {conversations} = useConversation();
  const [convs, setConvs] = useState<Conversation[]>([]);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const {theme} = useTheme();
  useEffect(() => {

    const msg = conversations.filter(c => !c.isGroup);
    setConvs(msg);
  }, [conversations]);
  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <CustomHeader scrollY={scrollY} theme={theme} />
      <Animated.FlatList
        data={convs}
        keyExtractor={(item, index) => `conv${item.conversationId}-${index}`}
        renderItem={({item}) => <ConversationItem conversation={item} />}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{paddingTop: 80}}
      />
    </View>
  );
};

export default ConversationScreen;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
