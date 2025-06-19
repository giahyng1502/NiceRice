import React, {useEffect, useMemo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../../navigation/AppNavigation';
import useGroupMember from './useGroupMember';
import {FlashList} from '@shopify/flash-list';
import {useTheme} from '../../../hooks/useTheme';
import MemberGroupItem from './MemberItem';
import IconBack from '../../../assets/svgs/icon_back';
import {FONT_SIZE} from '../../../styles/globalStyles';
import ModalAddMember from '../../../modals/bottom_sheet_addGroup';
import {useBottomSheet} from '../../../modals/bottom_sheet_modal';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';

type Props = NativeStackScreenProps<AppStackParamList, 'GroupChatMember'>;

const MemberChatScreen: React.FC<Props> = ({navigation, route}) => {
  const {conversationId} = route.params;
  const {members} = useGroupMember(conversationId);
  const user = useSelector((state: RootState) => state.user.data);
  const {openBottomSheet, closeBottomSheet} = useBottomSheet();
  const {t} = useTranslation();

  const isAdmin = useMemo(() => {
    return members.some(p => p.userId === user?.userId && p.isAdmin);
  }, [members, user]);

  useEffect(() => {
    console.log(members);
  }, [members]);
  const {theme} = useTheme();
  const handleBack = () => {
    navigation.goBack();
  };
  const bottomSheetAddMember = () => {
    openBottomSheet(
      <ModalAddMember
        participantCurrent={members}
        onClose={() => closeBottomSheet()}
        navigation={navigation}
        conversationId={conversationId}
      />,
      ['95%'], // snap points
      0, // index mặc định
    );
  };
  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <IconBack color={theme.iconColor} />
        </TouchableOpacity>
        {isAdmin && (
          <TouchableOpacity onPress={bottomSheetAddMember}>
            <Text
              style={{
                color: theme.text2,
                fontSize: FONT_SIZE.titleMedium,
                fontWeight: 'bold',
                marginLeft: 10,
              }}>
              {t('optionScreen.invite')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <FlashList
        data={members}
        renderItem={({item}) => <MemberGroupItem member={item} />}
        estimatedItemSize={100}
        keyExtractor={item => item.participantId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  header: {
    height: 60,
    paddingTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MemberChatScreen;
