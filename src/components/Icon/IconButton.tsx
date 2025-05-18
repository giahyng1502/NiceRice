import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {globalStyles, width} from '../../styles/globalStyles';
import {useTheme} from '../../hooks/useTheme';

interface IProps {
  onPress?: () => void;
  title?: string;
  icon?: React.ReactNode;
}

const IconButton: React.FC<IProps> = ({onPress, title, icon}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={{
        width: width * 0.23,
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <View
        style={{
          backgroundColor: theme.borderRadiusColorIcon,
          width: 36,
          height: 36,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {icon}
      </View>
      <Text
        style={[globalStyles.smailSize,{
          color: theme.text2,
        }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(IconButton);
