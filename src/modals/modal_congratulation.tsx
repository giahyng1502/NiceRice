import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import LogoCongratulation from '../assets/svgs/logo_congratulation';
import {globalStyles} from '../styles/globalStyles';
import LoadingAnimation from "../components/animation/loading_animation";
type Props = {
  isVisible: boolean;
  width: number;
  onClose: () => void;
  theme: any;
  height: number;
};
const ModalCongratulation: React.FC<Props> = ({
  isVisible,
  width,
  height,
  onClose,
  theme,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn={'slideInLeft'}
      animationOut={'slideOutRight'}
      deviceWidth={width}
      deviceHeight={width}
      backdropOpacity={0}
      useNativeDriver={true}
      onBackdropPress={onClose}>

        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: theme.backgroundModal,
            },
          ]}>
          <Text
            style={[
              globalStyles.title,
              {
                color: theme.text2,
                fontWeight: 600,
                marginBottom : height*0.03
              },
            ]}>
            Congratulations!
          </Text>
          <LogoCongratulation />

          <Text
            style={[
              globalStyles.contentSize,
              {
                color: theme.text2,
                  marginTop : height*0.02,
                  marginBottom : 3,
              },
            ]}>
            Your account is now ready to use.
          </Text>

          <Text
            style={[
              globalStyles.contentSize,
              {
                  color: theme.text3,
                  flexWrap : 'wrap',
                  textAlign : 'center',
                  marginBottom : height*0.02
              },
            ]}>
            You will be redirected to the Home page shortly.
          </Text>
            <LoadingAnimation/>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    padding: 22,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

export default ModalCongratulation;
