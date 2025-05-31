import React, {createContext, useCallback, useContext, useState} from 'react';

export type SnackbarType = 'success' | 'error' | 'warning' | 'info';

interface SnackbarContextProps {
  visible: boolean;
  message: string;
  type: SnackbarType;
  showSnackbar: (msg: string, type?: SnackbarType) => void;
  hideSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined,
);

export const SnackbarProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<SnackbarType>('info');

  const showSnackbar = useCallback(
    (msg: string, type: SnackbarType = 'info') => {
      setMessage(msg);
      setType(type);
      setVisible(true);
    },
    [],
  );

  const hideSnackbar = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <SnackbarContext.Provider
      value={{visible, message, type, showSnackbar, hideSnackbar}}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
