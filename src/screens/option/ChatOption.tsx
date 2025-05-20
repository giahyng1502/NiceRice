import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {RootStackParamList} from '../../navigation/AppNavigation';
import {useTheme} from '../../hooks/useTheme';
import IconBack from '../../assets/svgs/icon_back';
import {globalStyles, width} from '../../styles/globalStyles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Magin from '../../components/margin/magin';
import ItemOption from './OtionItem';
import IconGroup from '../../assets/svgs/ic_groups';
import IconCustomColor from '../../assets/svgs/icon_custom_color';
import IconCustomBackground from '../../assets/svgs/icon_custom_backgroup';
import IconColor from "../../assets/svgs/icon_custom_color";

type Props = NativeStackScreenProps<RootStackParamList, 'ChatOption'>;

const ChatOptionScreen: React.FC<Props> = ({navigation, route}) => {
  const {name, image} = route.params;
  const theme = useTheme();
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <IconBack />
        </TouchableOpacity>
      </View>
      <View style={styles.information}>
        <Image source={{uri: image}} style={styles.image} />
        <Text
          style={[
            globalStyles.title,
            {
              color: theme.text2,
              fontWeight: 700,
            },
          ]}>
          {name}
        </Text>
      </View>
      <Magin top={2} />
      <View
        style={{
          height: 1,
          backgroundColor: theme.text2,
        }}
      />
        <Magin top={2}/>
      <View style={{
          width : '100%',
          height : 120,
          justifyContent : 'flex-start',
          alignItems : 'flex-start'
      }}>
          <ItemOption Icon={IconGroup} title={'Add To Group'} />
          <ItemOption Icon={IconColor} title={'Custom Color Chat'} />
          <ItemOption Icon={IconCustomBackground} title={'Custom Background Chat'} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  information: {
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 80,
    paddingTop: 15,
  },
});

export default ChatOptionScreen;
