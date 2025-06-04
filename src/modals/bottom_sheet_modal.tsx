// src/contexts/BottomSheetContext.tsx
import React, {
  createContext,
  ReactNode,
  useRef,
  useState,
  useMemo,
  useEffect,
} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

type BottomSheetContextType = {
  openBottomSheet: (
      content: ReactNode,
      snapPoints?: string[],
      initialIndex?: number,
  ) => void;
  closeBottomSheet: () => void;
  isVisible: boolean;
};


export const BottomSheetContext = createContext<
    BottomSheetContextType | undefined
>(undefined);

export const BottomSheetProvider: React.FC<{ children: ReactNode }> = ({
                                                                         children,
                                                                       }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [content, setContent] = useState<ReactNode>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [snapPoints, setSnapPoints] = useState<string[]>(['10%']);
  const [initialIndex, setInitialIndex] = useState(0);
  const {theme} = useTheme()
  // Memo hóa snapPoints tránh tạo mảng mới liên tục
  const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

  // Khi isVisible hoặc initialIndex thay đổi, snap BottomSheet
  useEffect(() => {
    if (isVisible) {
      console.log('BottomSheetProvider visible',);
      bottomSheetRef.current?.snapToIndex(initialIndex);
    } else {
      // Ẩn BottomSheet bằng cách chuyển index về -1
      bottomSheetRef.current?.close();
    }
  }, [isVisible, initialIndex]);


  const openBottomSheet = (
      newContent: ReactNode,
      newSnapPoints: string[] = ['0%'],
      snapIndex: number = 0,
  ) => {
    setContent(newContent);
    setSnapPoints(newSnapPoints);
    setInitialIndex(snapIndex);
    setIsVisible(true);

    requestAnimationFrame(() => {
      bottomSheetRef.current?.snapToIndex(snapIndex);
    });
  };

  const closeBottomSheet = () => {
    setIsVisible(false);
  };

  return (
      <BottomSheetContext.Provider
          value={{ openBottomSheet, closeBottomSheet, isVisible }}
      >
        {children}
        <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={memoizedSnapPoints}
            enablePanDownToClose
            backgroundStyle={{
              backgroundColor : theme.bottomSheetColor
            }}
            onClose={() => setIsVisible(false)}
        >
          {content}
        </BottomSheet>
      </BottomSheetContext.Provider>
  );
};

// src/hooks/useBottomSheet.ts
import { useContext } from 'react';
import {useTheme} from "../hooks/useTheme";

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};

