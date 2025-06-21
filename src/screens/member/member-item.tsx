import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {User} from '../../store/reducers/userSlice';
import {useTheme} from '../../hooks/useTheme';
import {FONT_SIZE} from '../../styles/globalStyles';
import {AppStackParamList} from '../../navigation/AppNavigation';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {createConversationId} from '../../utils/createConversationId';
import IconChecked from '../../assets/svgs/ic_checked';
import IconCheck from '../../assets/svgs/icon_check';
import {useSelectMode} from '../../provider/SelectMemberProvider';

interface Props {
  member: User;
  isChecked: boolean;
  isOnline: boolean;
  currentUser: User;
  onToggle: (member: User, checked: boolean) => void;
  navigation : any
}


const MemberItem: React.FC<Props> = React.memo(
  ({member, isChecked, isOnline, onToggle, currentUser,navigation}) => {
    const {theme} = useTheme();
    const isSelect = useSelectMode();

    const handleUserProfile = () => {
      navigation.navigate("UserProfile",{
        userId : member.userId
      })
    };

    const handleCheckToggle = () => {
      onToggle(member, !isChecked);
    };

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={handleUserProfile}
        disabled={isSelect}>
        <View style={styles.item}>
          <View style={styles.frameAvatar}>
            <Image source={{uri: member.avatarUrl}} style={styles.image} />
            {isOnline && <View style={styles.online} />}
          </View>
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text style={[styles.fullname, {color: theme.text2}]}>
              {member.fullName}
            </Text>
            <Text style={[styles.fullname, {color: theme.text3}]}>
              {member.phoneNumber}
            </Text>
          </View>

          {isSelect && (
            <TouchableOpacity onPress={handleCheckToggle} style={{padding: 8}}>
              {isChecked ? <IconChecked /> : <IconCheck />}
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  },
  (prev, next) =>
    prev.isChecked === next.isChecked &&
    prev.member.userId === next.member.userId,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  fullname: {
    fontSize: FONT_SIZE.bodyLarge,
    fontWeight: 'bold',
  },
  frameAvatar: {
    position: 'relative',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  online: {
    width: 12,
    position: 'absolute',
    bottom: 0,
    right: 20,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#40C4FF',
  },
});

export default MemberItem;
