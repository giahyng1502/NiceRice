import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FONT_SIZE} from '../styles/globalStyles';
import {useTheme} from '../hooks/useTheme';
import {useTranslation} from 'react-i18next';
import TextButton from '../components/buttons/TextButton';
import Margin from "../components/margin/magin";

const BottomSheetConfirmBlock = ({onClose, fullName, userId}) => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const handleConfirmBlock = () => {
    // Logic to block the user
    console.log(`User with ID ${userId} has been blocked.`);
    onClose();
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: FONT_SIZE.titleMedium,
          color: theme.text2,
          fontWeight: 'bold',
          marginVertical: 10,
        }}>
        {t('modal.Block')} {''} {fullName} ?
      </Text>
      <Text
        style={{
          fontSize: FONT_SIZE.bodyMedium,
          color: theme.text3,
          fontWeight: 'bold',
          marginVertical: 10,
        }}>
        {t('report.description_block')}
      </Text>
        <Margin top={2}/>
      <TextButton
        title={t('modal.Block')}
        onPress={handleConfirmBlock}
        customButton={{width: '100%'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

export default BottomSheetConfirmBlock;
