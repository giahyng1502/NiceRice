import React from 'react';
import { StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import LoadingAnimation from "../components/animation/loading_animation";
type Props =  {
    visible: boolean;
}
const LoadingModal : React.FC<Props>= ({visible}) => (
  <Modal isVisible={visible} backdropOpacity={0.2} style={styles.container} >
    <LoadingAnimation/>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingModal;
