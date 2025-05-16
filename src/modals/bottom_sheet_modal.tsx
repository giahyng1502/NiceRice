import {StyleSheet} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {useTheme} from "../hooks/useTheme";
import React, {useEffect, useRef} from "react";

type Props = {
  children: React.ReactNode;
  visible: boolean;
  onClose?: () => void;
  initialSnapIndex?: number; // tùy chọn
  snapPoints: Array<string>;
};

const BottomSheetModal: React.FC<Props> = ({
  children,
  visible,
  onClose,
  initialSnapIndex = 0,
  snapPoints,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
    const theme = useTheme();
  // Các mức snap point

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.snapToIndex(initialSnapIndex);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible, initialSnapIndex]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
      backgroundStyle={[styles.background,{backgroundColor : theme.bottomSheetColor}]}
      handleIndicatorStyle={styles.handle}>
      {children}
    </BottomSheet>
  );
};

export default BottomSheetModal;

const styles = StyleSheet.create({
  background: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  handle: {
    backgroundColor: '#ccc',
  },
});
