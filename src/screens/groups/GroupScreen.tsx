import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import CustomHeader from '../../navigation/CustomHeader';
import {useTheme} from '../../hooks/useTheme';
import {useSharedValue} from 'react-native-reanimated';
import {FlashList} from '@shopify/flash-list';
import {conversations, fakeConversations} from '../../models/fakeData';
import GroupItem from './GroupItem';
import {Conversation} from "../../models/types";

const GroupScreen = () => {
  const {theme} = useTheme();
  const scrollY = useSharedValue(0);
  const [groupMsg, setGroupMsg] = useState<Conversation[]>([]);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  };
  useEffect(() => {
    const msg = fakeConversations.filter(c=> c.isGroup)
    setGroupMsg(msg);
  }, [])
  return (
    <>
      <CustomHeader scrollY={scrollY} theme={theme} />
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.background,
          },
        ]}>
        <FlashList
          data={groupMsg}
          renderItem={({item}) => <GroupItem conversation={item} />}
          keyExtractor={item => item.conversationId}
          onScroll={handleScroll}
          scrollEventThrottle={16} // cập nhật scroll 60fps
          estimatedItemSize={70}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 18,
  },
});

export default GroupScreen;
