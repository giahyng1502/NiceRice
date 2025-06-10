import {FlatList, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import AnimatedMemberItem from '../../components/animation/memberCreateAnimation';
import {User} from '../../store/reducers/userSlice';
type MemberListProps = {
  members: User[];
  onDelete: (userId) => void;
};
const HorizontalAnimatedList: React.FC<MemberListProps> = ({
  members,
  onDelete,
}) => {
  // @ts-ignore
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={members}
        keyExtractor={(item, index) => `${item.userId} + ${index}`}
        renderItem={({item}) => <AnimatedMemberItem item={item} onDelete={onDelete} />}
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    alignItems: 'flex-start',
  },
  list: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 10,
  },
  item: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#28A745',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
});

export default React.memo(HorizontalAnimatedList);
