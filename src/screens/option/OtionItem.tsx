import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import {globalStyles, height} from '../../styles/globalStyles';
import {useTheme} from '../../hooks/useTheme';
import IconArrowRight from '../../assets/svgs/icon_arrow_right';

interface IProps {
  Icon: React.ReactNode;
  title: string;
  color?: string;
  type?: 'next' | 'color' | 'radio' | 'switch';
  selected?: boolean;
  onPress?: () => void;
}

const ItemOption: React.FC<IProps> = ({
  Icon,
  title,
  color,
  type = 'next',
  onPress,
}) => {
  const {themeType, theme, setTheme} = useTheme();
  const onToggleSwitch = () => {
    const newValue = themeType === 'light' ? 'dark' : 'light';
    setTheme(newValue);
  };

  const renderItemType = () => {
    switch (type) {
      case 'next':
        return <IconArrowRight color={theme.iconColor} />;
      case 'color':
        return (
          <View
            style={{
              backgroundColor: color,
              width: 60,
              height: 50,
              borderRadius: 16,
            }}
          />
        );
      case 'switch':
        return (
          <Switch
            trackColor={{false: '#767577', true: theme.primary}}
            thumbColor={themeType === 'dark' ? theme.primary : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={onToggleSwitch}
            value={themeType === 'dark'}
          />
        );
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      disabled={type === 'switch'} // switch thì không cho onPress thằng container
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundItem,
          shadowOpacity: 1,
        },
      ]}>
      <Text
        style={[
          globalStyles.contentSize,
          {color: theme.text2, fontWeight: '700', flex: 1},
        ]}>
        {title}
      </Text>
      {renderItemType()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: height * 0.08,
    paddingHorizontal: 15,
    flexDirection: 'row',
    borderRadius: 16,
    elevation: 4,
    marginVertical: 10,
  },
});

export default React.memo(ItemOption);
