import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../../hooks/useTheme';
import {FONT_SIZE} from '../../styles/globalStyles';
import IconBack from '../../assets/svgs/icon_back';
import ButtonChecked from "../../components/buttons/ButtonChecked";
import Margin from "../../components/margin/magin";
import KeyboardCustomView from "../../components/container/KeyboardAvoidingView";
import TextInputMultiline from "../../components/input/TextInputMultiline";
const options = [
  'harassment',
  'suicide_or_self_injury',
  'pretending_to_be_someone_else',
  'violence_or_dangerous_organizations',
  'nudity_or_sexual_activity',
  'selling_or_promoting_restricted_item',
  'scam_or_fraud',
  'other',
];
const ReportScreen = ({navigation, route}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const userId = route.params?.userId;
  const [moreInfor, setMoreInfor] = useState("")
  const [selected, setSelected] = useState(null);
  const handleBack = () => {
    navigation.goBack();
  };
  return (
      <KeyboardCustomView>
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}>
      <TouchableOpacity
        onPress={handleBack}
        style={{height: 50, justifyContent: 'flex-start', marginTop: 20}}>
        <IconBack color={theme.iconColor} />
      </TouchableOpacity>
      <Text
        style={{
          color: theme.text2,
          fontSize: FONT_SIZE.titleLarge,
          fontWeight: 'bold',
        }}>
        {t('report.select_problem')}

      </Text>

      <Text style={{color: theme.text3, fontSize: FONT_SIZE.bodyLarge}}>
        {t('report.dont_wait')}
      </Text>
      <Margin top={2}/>
      <View>
        {options.map((option, index) => (
            <ButtonChecked
                key={index}
                label={t(`report.${option}`)}
                checked={selected === option}
                onPress={() => setSelected(option)}
            />
        ))}
      </View>
      <TextInputMultiline value={moreInfor} setValue={setMoreInfor} placeHolder={t('report.provider')}/>

      <TouchableOpacity
          style={[
            styles.button,
            {
              height: 50,
              backgroundColor: theme.background,
              borderRadius: 8,
              flex: 2,
            },
          ]}
          onPress={()=>{}}>
        <Text
            style={{
              color: theme.text2,
              borderColor: theme.borderColor,
              fontSize: FONT_SIZE.bodyLarge,
              fontWeight : 'bold',
            }}>
          {t('report.submit')}

        </Text>
      </TouchableOpacity>
    </ScrollView>
      </KeyboardCustomView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  button: {
    borderRadius: 8,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    elevation: 6,
    width : '100%',
    marginTop : 20,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

export default ReportScreen;
