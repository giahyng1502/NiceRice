import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Participant} from '../../../hooks/useParticipant';
import {FONT_SIZE} from "../../../styles/globalStyles";
import {useTheme} from "../../../hooks/useTheme";
import {formatSmartDate} from "../../../utils/formatDate";
import {useTranslation} from "react-i18next";
import IconKing from "../../../assets/svgs/ic_king";
type MemberItemProps = {
  member: Participant;
  onDelete?: (id: string) => void;
};
const MemberGroupItem: React.FC<MemberItemProps> = ({member, onDelete}) => {
  console.log(member)
  const {t, i18n} = useTranslation();
  const isAdmin = member.isAdmin;
  const locale = i18n.language || 'en-US';
  const joinDate = formatSmartDate(member.joinedAt,locale);
  const {theme} = useTheme();

  return (
      <View style={styles.item}>
        <View style={styles.frameAvatar}>
          <Image source={{uri: member.avatarUrl}} style={styles.image} />
        </View>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Text style={[styles.fullname, {color: theme.text2}]}>
            {member.fullName}
          </Text>
          <Text style={[styles.fullname, {color: theme.text3}]}>
            Ngày vào nhóm : {joinDate}
          </Text>
        </View>

        {isAdmin && (
            <View style={{padding: 8}} >
              <IconKing/>
            </View>
        )}
      </View>
  )
}

const styles = StyleSheet.create({
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
    height: 80,
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


export default React.memo(MemberGroupItem);
