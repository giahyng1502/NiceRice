import React from 'react';
import {Text, StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import Animated, {FadeInRight, Layout} from 'react-native-reanimated';
import {User} from '../../store/reducers/userSlice';
import {useTheme} from '../../hooks/useTheme';
import {FONT_SIZE} from '../../styles/globalStyles';
import IconDelete from "../../assets/svgs/ic_delete";

type Props = {
    item: User;
    onDelete: (id: string) => void;
};

const AnimatedMemberItem: React.FC<Props> = ({item, onDelete}) => {
  const {theme} = useTheme();
  return (
    <Animated.View
      entering={FadeInRight.duration(400)}
      layout={Layout.springify()}>
      <View style={styles.item}>
        <View
          style={{
            position: 'relative',
          }}>
          <Image
            source={{uri: item.avatarUrl}}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
            }}
          />
          <TouchableOpacity
              onPress={() => onDelete(item.userId)}
            style={{
              width: 24,
              height: 24,
              position: 'absolute',
              top: 0,
              right: -5,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.deleteSearch,
              borderRadius: 14,
            }}>
            <IconDelete/>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: theme.text2,
            fontSize: FONT_SIZE.labelMedium,
            textAlign: 'center',
          }}>
          {item.fullName}
        </Text>
      </View>
    </Animated.View>
  );
};
export default AnimatedMemberItem;
const styles = StyleSheet.create({
  item: {
    width: 70,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
});
