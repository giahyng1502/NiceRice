import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {User} from '../../store/reducers/userSlice';
import {useTheme} from "../../hooks/useTheme";
import {FONT_SIZE} from "../../styles/globalStyles";
import {AppStackParamList} from "../../navigation/AppNavigation";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {createConversationId} from "../../utils/createConversationId";
interface Props {
  member: User;
  memberOnline : number[],
  currentUser : User,
}

type NavigationProps = NavigationProp<AppStackParamList, 'Messages'>;

const MemberItem: React.FC<Props> = React.memo(({member,memberOnline,currentUser}) => {
  console.log('member', member);
  const {theme} = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const isOnline = memberOnline.includes(member.userId)

  const handleMessageDetail = ()=> {
    const userIds = [currentUser.userId, member.userId];
    const conversationId = createConversationId(userIds,false);
    navigation.navigate('MessageDetail', {
      id: conversationId,
    })
  }
  return (
    <TouchableOpacity style={styles.container} onPress={handleMessageDetail}>
      <View style={styles.item}>
        <Image source={{uri: member.avatarUrl}} style={styles.image}/>
        <View style={{flexDirection : 'column',flex : 1}}>
          <Text style={[styles.fullname,{color : theme.text2}]}>{member.fullName}</Text>
          <Text style={[styles.fullname,{color : theme.text3}]}>{member.phoneNumber}</Text>
        </View>
        {isOnline && (
            <View style={styles.online}></View>
        )}
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
    height : 12,
    borderRadius : 4,
    backgroundColor : '#40C4FF'
  }
});

export default MemberItem;
