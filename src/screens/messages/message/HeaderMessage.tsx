import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/AppNavigation';
import {useTheme} from '../../../hooks/useTheme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import IconBack from '../../../assets/svgs/icon_back';
import {globalStyles} from '../../../styles/globalStyles';
import IconShowMore from "../../../assets/svgs/icon_showmore";
type Props = {
    handleBack : () => void;
    handleChatOption : () => void;
};

const HeaderMessage: React.FC<Props> = ({handleBack,handleChatOption}) => {
  const theme = useTheme();
    return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundMessage,
        },
      ]}>
      <TouchableOpacity onPress={handleBack}>
          <IconBack/>
      </TouchableOpacity>
      <Text
        style={[
          globalStyles.title,
          {
            color: theme.text2,
          },
        ]}>
        Message
      </Text>
        <TouchableOpacity onPress={handleChatOption}>
            <IconShowMore/>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

export default HeaderMessage;
