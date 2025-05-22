import React from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {width} from '../styles/globalStyles';
import IconCamera from '../assets/svgs/ic_camera';
import {useTheme} from '../hooks/useTheme';
import IconButton from '../components/Icon/IconButton';
import IconRecord from '../assets/svgs/ic_record';
import IconPerson from '../assets/svgs/icon_person';
import IconGallery from '../assets/svgs/ic_gallery';
import IconLocation from '../assets/svgs/ic_location';
import IconDocument from '../assets/svgs/ic_document';
import {HEIGHT_INPUT_TOOLBAR} from '../screens/messages/message/custom_input_toolbar';
import {useTranslation} from "react-i18next";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ModalOption: React.FC<Props> = ({visible, onClose}) => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      animationIn={'fadeInLeft'}
      animationOut={'fadeOutLeft'}
      backdropOpacity={0}
      style={{
        alignItems: 'flex-start',
      }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.backgroundModal,
          },
        ]}>
        <IconButton
          icon={<IconCamera color={theme.iconColor} />}
          onPress={() => {}}
          title={t('modal.camera')}
        />
        <IconButton
          icon={<IconRecord color={theme.iconColor} />}
          onPress={() => {}}
          title={t('modal.record')}
        />
        <IconButton
          icon={<IconPerson color={theme.iconColor} />}
          onPress={() => {}}
          title={t('modal.contact')}
        />
        <IconButton
          icon={<IconGallery color={theme.iconColor} />}
          onPress={() => {}}
          title={t('modal.gallery')}
        />
        <IconButton
          icon={<IconLocation color={theme.iconColor} />}
          onPress={() => {}}
          title={t('modal.location')}
        />
        <IconButton
          icon={<IconDocument color={theme.iconColor} />}
          onPress={() => {}}
          title={t('modal.document')}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: HEIGHT_INPUT_TOOLBAR,
    width: width * 0.8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    gap: 5,
    justifyContent: 'space-between',
    alignContent: 'center',
    flexWrap: 'wrap',
    height: 150,
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

export default React.memo(ModalOption);
