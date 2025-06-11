import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonShimmer from './SkeletonShimmer';

interface Props {
  repeat?: number;
}

const SkeletonMemberItem: React.FC<Props> = ({repeat = 6}) => {
  return (
    <>
      {Array.from({length: repeat}).map((_  , index) => (
        <View key={index} style={styles.container}>
          <SkeletonShimmer style={styles.avatar} />
          <View style={styles.info}>
            <SkeletonShimmer style={styles.line1} />
            <SkeletonShimmer style={styles.line2} />
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  line1: {
    width: 140,
    height: 20,
    borderRadius: 4,
  },
  line2: {
    width: 100,
    height: 20,
    borderRadius: 4,
    marginTop: 6,
  },
});

export default SkeletonMemberItem;
