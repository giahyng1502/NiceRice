import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useTheme} from '../hooks/useTheme';
import {useTranslation} from 'react-i18next';
import useMember from '../screens/member/useMember';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {User} from '../store/reducers/userSlice';
import {FONT_SIZE} from '../styles/globalStyles';
import HorizontalAnimatedList from '../screens/member/member-create-list';
import {SelectModeContext} from '../provider/SelectMemberProvider';
import {FlashList} from '@shopify/flash-list';
import MemberItem from '../screens/member/member-item';
import SkeletonMemberItem from '../components/skeleton/SkeletonMemberItem';
import LoadingModal from './modal_loading';
import {ScrollView} from 'react-native-gesture-handler';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {addMemberIntoConversation} from '../store/action/participantAction';
import {Participant} from '../hooks/useParticipant';
import {useDebounce} from '../hooks/useDebound';
import {searchUserFromServer} from '../apis/service/search-user';

type Props = {
  onClose: () => void;
  navigation: any;
  conversationId: string;
  participantCurrent: Participant[];
};

const ModalAddMember = ({
  onClose,
  navigation,
  conversationId,
  participantCurrent = [],
}: Props) => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const {memberOnline, members, loading, loadMore, user} = useMember();
  const slideTop = useSharedValue(0);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [searchUser, setSearchUser] = useState<User[]>([]);
  const searchDebounced = useDebounce(searchText, 500);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isDone = selectedMembers.length > 0;
  const animatedTopSlide = useAnimatedStyle(() => {
    return {
      height: slideTop.value,
      opacity: interpolate(slideTop.value, [0, 120], [0, 1]),
    };
  });

  const handleCancel = () => {
    setSelectedMembers([]);
    onClose();
  };
  //
  const addMember = async () => {
    try {
      if (selectedMembers.length < 1) {
        Alert.alert('Lỗi', 'Bạn phải thêm ít nhất 1 thành viên.');
        return;
      }
      if (participantCurrent.length + selectedMembers.length > 20) {
        Alert.alert(
          'Lỗi',
          'Số lượng thành viên trong nhóm đã đạt giới hạn tối đa (20 thành viên).',
        );
        return;
      }

      setIsLoading(true);

      const memberIds = selectedMembers.map(member => member.userId);
      console.log(memberIds);

      // ⚠️ Cần await để nhận kết quả từ dispatch thunk
      const res = await dispatch(
        addMemberIntoConversation({conversationId, memberIds}),
      );

      if (res.meta.requestStatus === 'rejected') {
        Alert.alert('Lỗi', 'Không thể thêm thành viên vào nhóm.');
        return;
      }

      // ✅ Nếu thành công, reset lại danh sách
      Alert.alert('Thành công', 'Thêm thành viên thành công.');

      setSelectedMembers([]);
    } catch (error) {
      console.error('Lỗi tạo nhóm:', error);
      Alert.alert('Thất bại', 'Không thể tạo nhóm. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  useEffect(() => {
    if (selectedMembers.length > 0) {
      slideTop.value = withTiming(100, {duration: 500});
    } else {
      slideTop.value = withTiming(0, {duration: 500});
    }
  }, [selectedMembers.length]);
  // Hàm xử lý khi người dùng chọn hoặc bỏ chọn thành viên
  const handleMemberCheck = useCallback((member: User, isChecked: boolean) => {
    if (isChecked) {
      // Nếu isChecked là true, thêm thành viên vào danh sách
      setSelectedMembers(prevMembers => [...prevMembers, member]);
    } else {
      // Nếu isChecked là false, xóa thành viên khỏi danh sách
      setSelectedMembers(prevMembers =>
        prevMembers.filter(m => m.userId !== member.userId),
      );
    }
  }, []);

  const deleteMemeber = useCallback((userId: string) => {
    // @ts-ignore
    setSelectedMembers(prevMembers =>
      prevMembers.filter(m => m.userId !== userId),
    );
  }, []);
  useEffect(() => {
    console.log(selectedMembers);
  }, [selectedMembers]);

  //
  useEffect(() => {
    const filterUser = async () => {
      const participantIds = new Set(participantCurrent.map(p => p.userId));

      if (searchDebounced.trim() === '') {
        // Lọc members để loại bỏ những người đã là participant
        const result = members.filter(u => !participantIds.has(u?.userId));
        setSearchUser(result);
      } else {
        const filtered = await searchUserFromServer(searchDebounced);
        const result = filtered.filter(u => !participantIds.has(u?.userId));
        setSearchUser(result);
      }
    };

    filterUser();
  }, [searchDebounced, members, participantCurrent]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <TouchableOpacity onPress={handleCancel}>
            <Text
              style={[
                {
                  color: theme.text2,
                  fontSize: FONT_SIZE.bodyLarge,
                  fontWeight: 'bold',
                },
              ]}>
              {t('memberScreen.cancel')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={!isDone} onPress={addMember}>
            <Text
              style={[
                {
                  color: isDone ? theme.text2 : theme.text3,
                  fontSize: FONT_SIZE.bodyLarge,
                  fontWeight: 'bold',
                },
              ]}>
              {t('memberScreen.done')}
            </Text>
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            {
              width: '100%',
              gap: 8,
              overflow: 'hidden',
            },
            animatedTopSlide,
          ]}>
          <HorizontalAnimatedList
            members={selectedMembers}
            onDelete={deleteMemeber}
          />
        </Animated.View>
      </View>
      <ScrollView>
        <View
          style={{
            width: '100%',
            marginTop: 20,
            height: 50,
            margin: 2,
            paddingHorizontal: 15,
            borderRadius: 8,
            marginBottom: 10,
            elevation: 4,
            backgroundColor: theme.background,
          }}>
          <TextInput
            value={searchText}
            placeholder={'Search'}
            placeholderTextColor={theme.text3}
            onChangeText={setSearchText}
            style={{
              width: '100%',
              height: 50,
              color: theme.text2,
              fontSize: FONT_SIZE.titleMedium,
            }}
          />
        </View>
        {members.length > 0 ? (
          <SelectModeContext.Provider value={true}>
            {searchUser.length > 0 ? (
              <FlashList
                data={searchUser}
                keyExtractor={(item, index) => `conv${item.userId}-${index}`}
                renderItem={({item}) => (
                  <MemberItem
                    member={item}
                    isChecked={selectedMembers.some(
                      m => m.userId === item.userId,
                    )}
                    isOnline={memberOnline.includes(item.userId)}
                    currentUser={user}
                    navigation={navigation}
                    onToggle={handleMemberCheck}
                  />
                )}
                extraData={[selectedMembers, memberOnline]}
                scrollEventThrottle={16}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                estimatedItemSize={80}
                contentContainerStyle={{paddingTop: 10}}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: theme.text2,
                    fontSize: FONT_SIZE.bodyLarge,
                  }}>
                  {t('memberScreen.noResult')}
                </Text>
              </View>
            )}
          </SelectModeContext.Provider>
        ) : (
          <SkeletonMemberItem repeat={10} />
        )}
      </ScrollView>
      <LoadingModal visible={isloading} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
  },
});

export default React.memo(ModalAddMember);
