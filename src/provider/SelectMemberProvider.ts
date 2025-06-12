import { createContext, useContext } from 'react';

export const SelectModeContext = createContext(false);

// Hook tiện dùng
export const useSelectMode = () => useContext(SelectModeContext);
