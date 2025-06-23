import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../hooks/useTheme';
import {FONT_SIZE} from '../styles/globalStyles';

const BottomSheetReport = ({userId,fullName, onClose,navigation}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();


    const handleReportUser = () => {
        navigation.navigate('ReportScreen',{
            userId: userId,
        });
        onClose();
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          width: '100%',
          backgroundColor: theme.background,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: theme.text2,
            fontSize: FONT_SIZE.bodyLarge,
            fontWeight: 'bold',
          }}>
          {' '}
          {t('modal.Block')}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#5b5b5b',
          marginVertical: 10,
        }}></View>
      <TouchableOpacity
        style={{
          width: '100%',
          backgroundColor: theme.background,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={handleReportUser}>
        <Text
          style={{
            color: theme.text2,
            fontSize: FONT_SIZE.bodyLarge,
            fontWeight: 'bold',
          }}>
          {' '}
          {t('modal.Report')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomSheetReport;
