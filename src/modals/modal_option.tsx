import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {width} from '../styles/globalStyles';
import Row from '../components/container/Row';
import IconCamera from '../assets/svgs/ic_camera';
import {useTheme} from '../hooks/useTheme';
import IconButton from "../components/Icon/IconButton";
import IconRecord from "../assets/svgs/ic_record";
import IconPerson from "../assets/svgs/icon_person";
import IconGallery from "../assets/svgs/ic_gallery";
import IconLogout from "../assets/svgs/ic_logout";
import IconLocation from "../assets/svgs/ic_location";
import IconDocument from "../assets/svgs/ic_document";
import {HEIGHT_INPUT_TOOLBAR} from "../screens/messages/message/custom_input_toolbar";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ModalOption: React.FC<Props> = ({visible, onClose}) => {
    const theme = useTheme();
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      animationIn={'fadeInLeft'}
      animationOut={'fadeOutLeft'}
      backdropOpacity={0}
      style={{
          alignItems : 'flex-start',
      }}
    >
        <View style={[styles.container,{
            backgroundColor : theme.backgroundModal
        }]}>
          <IconButton icon={<IconCamera/>} onPress={()=>{}} title={'Camera'} />
          <IconButton icon={<IconRecord/>} onPress={()=>{}} title={'Record'} />
          <IconButton icon={<IconPerson color={'white'}/>} onPress={()=>{}} title={'Contact'} />
          <IconButton icon={<IconGallery/>} onPress={()=>{}} title={'Gallery'} />
          <IconButton icon={<IconLocation/>} onPress={()=>{}} title={'My Location'} />
          <IconButton icon={<IconDocument/>} onPress={()=>{}} title={'Document'} />
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
      position: 'absolute',
      bottom : HEIGHT_INPUT_TOOLBAR,
      width: width*0.8,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 5,
      gap : 5,
      justifyContent: 'space-between',
      alignContent : 'center',
      flexWrap : 'wrap',
      height : 150,
      flexDirection : 'row'
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

export default React.memo(ModalOption);
