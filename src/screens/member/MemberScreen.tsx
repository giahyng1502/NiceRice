import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {useTranslation} from 'react-i18next';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import useMember from './useMember';
import MemberItem from './member-item';
import {FONT_SIZE, width} from '../../styles/globalStyles';
import {User} from '../../store/reducers/userSlice';
import HorizontalAnimatedList from './member-create-list';
import axiosClient from '../../apis/axios';
import {AppStackParamList} from '../../navigation/AppNavigation';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import LoadingModal from '../../modals/modal_loading';
import SkeletonMemberItem from '../../components/skeleton/SkeletonMemberItem';
import {SelectModeContext} from '../../provider/SelectMemberProvider';
import {FlashList} from '@shopify/flash-list';

type NavigationProps = NavigationProp<AppStackParamList, 'Member'>;

const MemberScreen = () => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProps>();
  const {memberOnline, filteredUser, loading, loadMore, user} = useMember({});
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const slideRight = useSharedValue(0);
  const slideTop = useSharedValue(0);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [groupName, setGroupName] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [isloading, setIsLoading] = useState<boolean>(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: slideRight.value}],
      opacity: interpolate(slideRight.value, [0, -100], [0, 1]),
    };
  });

  const animatedTopSlide = useAnimatedStyle(() => {
    return {
      height: slideTop.value,
      opacity: interpolate(slideTop.value, [0, 150], [0, 1]),
    };
  });

  //
  const createGroup = async () => {
    try {
      if (!groupName.trim()) {
        Alert.alert('Lỗi', 'Vui lòng nhập tên nhóm.');
        return;
      }

      if (selectedMembers.length < 2) {
        Alert.alert('Lỗi', 'Nhóm phải có ít nhất 2 thành viên.');
        return;
      }
      setIsLoading(true);
      const data = await axiosClient.post(`/conversation/createGroup`, {
        groupName,
        participantIds: selectedMembers.map(member => member.userId),
      });

      // ✅ Optional: Chuyển sang màn hình chat nhóm mới
      navigation.navigate('MessageDetail', {
        conversationId: data?.conversationId,
        members: selectedMembers,
        isGroup: true,
        groupName: groupName,
      });
      // ✅ Optional: Reset state
      setGroupName('');
      setSelectedMembers([]);
      setIsSelect(false);
    } catch (error) {
      console.error('Lỗi tạo nhóm:', error);
      Alert.alert('Thất bại', 'Không thể tạo nhóm. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSelect && selectedMembers.length > 0) {
      slideRight.value = withTiming(-100, {duration: 500});
      slideTop.value = withTiming(150, {duration: 500});
    } else {
      slideRight.value = withTiming(0, {duration: 500});
      slideTop.value = withTiming(0, {duration: 500});
    }
  }, [isSelect, selectedMembers.length]);

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
  const setSelected = (): void => {
    setIsSelect(!isSelect);
    if (!isSelect) {
      setSelectedMembers([]);
    }
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text
            style={[
              {
                color: theme.text2,
                fontSize: FONT_SIZE.customMedium,
                fontWeight: 'bold',
              },
            ]}>
            NiceRice
          </Text>
          <TouchableOpacity onPress={setSelected}>
            <Text
              style={[
                {
                  color: theme.text2,
                  fontSize: FONT_SIZE.bodyLarge,
                  fontWeight: 'bold',
                },
              ]}>
              {isSelect ? t('memberScreen.cancel') : t('memberScreen.select')}
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
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TextInput
              value={groupName}
              placeholder={t('memberScreen.GroupName')}
              placeholderTextColor={theme.text3}
              onChangeText={setGroupName}
              style={{
                flex: 1,
                color: theme.text2,
                minHeight: 48,
                fontSize: FONT_SIZE.titleMedium,
                paddingVertical: 10,
              }}
            />
            {groupName.length > 0 && (
              <TouchableOpacity
                onPress={() => setGroupName('')}
                style={{
                  width: 24,
                  height: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: theme.deleteSearch,
                  borderRadius: 14,
                }}>
                <Text
                  style={{
                    color: '#252525',
                    fontSize: FONT_SIZE.labelSmall,
                  }}>
                  X
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <HorizontalAnimatedList
            members={selectedMembers}
            onDelete={deleteMemeber}
          />
        </Animated.View>

        <View
          style={{
            width: '100%',
            marginTop: 20,
            height: 50,
            paddingHorizontal: 15,
            borderRadius: 8,
            marginBottom: 10,
              elevation : 4,
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
      </View>
      {filteredUser.length > 0 ? (
        <SelectModeContext.Provider value={isSelect}>
          <FlashList
            data={filteredUser}
            keyExtractor={(item, index) => `conv${item.userId}-${index}`}
            renderItem={({item}) => (
              <MemberItem
                member={item}
                isChecked={selectedMembers.some(m => m.userId === item.userId)}
                isOnline={memberOnline.includes(item.userId)}
                currentUser={user}
                navigation={navigation}
                onToggle={handleMemberCheck}
              />
            )}
            extraData={[selectedMembers, memberOnline]}
            scrollEventThrottle={16}
            refreshing={loading}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            estimatedItemSize={80}
            contentContainerStyle={{paddingTop: 10}}
          />
        </SelectModeContext.Provider>
      ) : (
        <SkeletonMemberItem repeat={10} />
      )}

      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 10,
            right: -90,
          },
          animatedStyle,
        ]}>
        <TouchableOpacity
          onPress={createGroup}
          disabled={!isSelect}
          style={{
            backgroundColor: theme.background,
            elevation: 8,
            width: 120,
            height: 50,
            padding: 8,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: theme.text2,
              fontSize: FONT_SIZE.bodyLarge,
              fontWeight: 700,
            }}>
            {t('memberScreen.createGroup')}
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <LoadingModal visible={isloading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 16,
  },
});

export default MemberScreen;
