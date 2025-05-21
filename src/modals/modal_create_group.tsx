import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {globalStyles, width} from '../styles/globalStyles';
import {useTheme} from '../hooks/useTheme';
import IconPerson from '../assets/svgs/icon_person';
import IconGroup from '../assets/svgs/ic_groups';

type Props = {
  visible: boolean;
  onClose: () => void;
  position: {x: number; y: number};
};

const CreateGroupModal: React.FC<Props> = ({visible, onClose, position}) => {
  const {theme} = useTheme();
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      backdropOpacity={0}
      animationIn="fadeInRight"
      animationOut="fadeOutRight"
      style={{margin: 0, position: 'absolute'}}>
      <View
        style={{
          position: 'absolute',
          top: position.y + 5,
          left: position.x - 140, // tuỳ chỉnh vị trí
          width: 160,
          padding: 15,
          backgroundColor: theme.backgroundModal,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 5,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: 10,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <IconPerson color={theme.iconColor}/>
          <Text style={[globalStyles.mediumText, {color: theme.text2}]}>
            Add Friend
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <IconGroup color={theme.iconColor} />
          <Text style={[globalStyles.mediumText, {color: theme.text2}]}>
            Create Group
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CreateGroupModal;
