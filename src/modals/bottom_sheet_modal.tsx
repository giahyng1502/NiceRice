import React, { useRef, useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

type Props = {
  children: React.ReactNode;
  visible: boolean;
  onClose?: () => void;
  initialSnapIndex?: number; // tùy chọn
};

const BottomSheetModal: React.FC<Props> = ({
                                             children,
                                             visible,
                                             onClose,
                                             initialSnapIndex = 0,
                                           }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Các mức snap point
  const snapPoints = useMemo(() => ['25%', '50%', '75%', '90%'], []);

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
          index={-1} // Đóng mặc định
          snapPoints={snapPoints}
          enablePanDownToClose
          onClose={onClose}
          backgroundStyle={styles.background}
          handleIndicatorStyle={styles.handle}
      >
        {children}
      </BottomSheet>
  );
};

export default BottomSheetModal;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  handle: {
    backgroundColor: '#ccc',
  },
});
