import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {useTranslation} from 'react-i18next';
import CustomHeader from '../../navigation/CustomHeader';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import useMember from './useMember';
import MemberItem from './member-item';

const MemberScreen = () => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const {memberOnline, allUser, loading, loadMore,user} = useMember();
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
    return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}>
      <CustomHeader scrollY={scrollY} theme={theme} />

      <Animated.FlatList
        data={allUser}
        keyExtractor={(item, index) => `conv${item.userId}-${index}`}
        renderItem={({item}) => <MemberItem currentUser={user} member={item} memberOnline={memberOnline}/>}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        refreshing={loading}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        contentContainerStyle={{paddingTop: 80}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

export default MemberScreen;
