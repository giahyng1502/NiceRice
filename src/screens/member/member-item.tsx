import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {User} from '../../store/reducers/userSlice';
import {useTheme} from "../../hooks/useTheme";
import {FONT_SIZE} from "../../styles/globalStyles";
import {AppStackParamList} from "../../navigation/AppNavigation";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {createConversationId} from "../../utils/createConversationId";
import CheckButton from "../../components/buttons/ButtonChecked";
interface Props {
  member: User;
  memberSelect: User[];
  memberOnline : number[],
  currentUser : User,
  isSelect : boolean,
  onCheck?: (member: User, isChecked: boolean) => void;
}

type NavigationProps = NavigationProp<AppStackParamList, 'Messages'>;

const MemberItem: React.FC<Props> = React.memo(({member,memberOnline,currentUser,isSelect,onCheck,memberSelect}) => {
  const initialChecked = memberSelect.includes(member)
  const {theme} = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const isOnline = memberOnline.includes(member?.userId)

  const handleMessageDetail = ()=> {
    const userIds = [currentUser.userId, member.userId];
    const conversationId = createConversationId(userIds,false);
    navigation.navigate('MessageDetail', {
      id: conversationId,
    })
  }
  return (
    <TouchableOpacity style={styles.container} onPress={handleMessageDetail} disabled={isSelect}>
      <View style={styles.item}>
        <View style={styles.frameAvatar}>
          {isOnline && (
              <View style={styles.online}></View>
          )}
          <Image source={{uri: member.avatarUrl}} style={styles.image}/>
        </View>
        <View style={{flexDirection : 'column',flex : 1}}>
          <Text style={[styles.fullname,{color : theme.text2}]}>{member.fullName}</Text>
          <Text style={[styles.fullname,{color : theme.text3}]}>{member.phoneNumber}</Text>
        </View>
        {isSelect && <CheckButton onCheck={onCheck} member={member} initialChecked={initialChecked} />}

      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding : 15,
  },
  fullname : {
    fontSize : FONT_SIZE.bodyLarge,
    fontWeight : 'bold',
  },
  frameAvatar : {
    position : 'relative',
  },
  image: {
    width : 50,
    height : 50,
    borderRadius: 25,
    marginRight : 15,
  },
  item :{
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems: 'center',
  },
  online : {
    width : 12,
    position : 'absolute',
    bottom : 0,
    right : 10,
    height : 12,
    borderRadius : 6,
    backgroundColor : '#40C4FF'
  }
});

export default MemberItem;
