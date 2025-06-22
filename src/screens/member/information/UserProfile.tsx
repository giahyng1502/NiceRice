import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useTheme} from '../../../hooks/useTheme';
import {useTranslation} from 'react-i18next';
import IconBack from '../../../assets/svgs/icon_back';
import {FONT_SIZE, width} from '../../../styles/globalStyles';
import Margin from '../../../components/margin/magin';
import TextCollapse from '../../../components/text/TextCollapse';
import {useUserProfile} from './useUserProfile';
import {createConversationId} from '../../../utils/createConversationId';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import IconShowMore from '../../../assets/svgs/icon_showmore';
import BottomSheetReport from '../../../modals/bottom_sheet_report';
import {useBottomSheet} from '../../../modals/bottom_sheet_modal';

const UserProfile = ({navigation, route}) => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const currentUser = useSelector((state: RootState) => state.user.data);
  const {userId} = route.params;
  const {userProfile} = useUserProfile(userId);
  const {openBottomSheet, closeBottomSheet} = useBottomSheet();

  const handleMessageDetail = () => {
    const userIds = [currentUser?.userId, userProfile.userId];
    const conversationId = createConversationId(userIds, false);
    navigation.navigate('MessageDetail', {
      conversationId: conversationId,
      members: [userProfile],
      isGroup: false,
    });
  };
  const handleBack = () => {
    navigation.goBack();
  };

  const openReportSheet = () => {
    openBottomSheet(
      <BottomSheetReport
        onClose={() => closeBottomSheet()}
        userId={userId}
        fullName={userProfile.fullName || 'Not Found'}
        navigation={navigation}
      />,
      ['20%'], // snap points
      0, // index mặc định
    );
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}>
      <View style={styles.coverPictureFrame}>
        <TouchableOpacity
          onPress={handleBack}
          style={{position: 'absolute', top: 30, left: 15, zIndex: 1}}>
          <IconBack color={theme.iconColor} />
        </TouchableOpacity>
        <Image
          style={styles.coverPicture}
          source={{
            uri: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/408234026_1769893336817121_5369472838129943215_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=aioy20ukva4Q7kNvwHpd6_8&_nc_oc=Adl9fuWcJPN_skJXrbZlWaU4uFxAWKcdfW5JmfMkPXWSfhvNLcAkQKuzM2yeEooH8FQ&_nc_zt=23&_nc_ht=scontent.fhan2-4.fna&_nc_gid=8LDZ3DJF6Yp7q0VL2LYf0Q&oh=00_AfPZ0gNCyiSoLARQB6q9CqGNTBLcEaKmyJIapJcplibGwg&oe=685B601C',
          }}
        />
        <View style={styles.frameInformation}>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/408234026_1769893336817121_5369472838129943215_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=aioy20ukva4Q7kNvwHpd6_8&_nc_oc=Adl9fuWcJPN_skJXrbZlWaU4uFxAWKcdfW5JmfMkPXWSfhvNLcAkQKuzM2yeEooH8FQ&_nc_zt=23&_nc_ht=scontent.fhan2-4.fna&_nc_gid=8LDZ3DJF6Yp7q0VL2LYf0Q&oh=00_AfPZ0gNCyiSoLARQB6q9CqGNTBLcEaKmyJIapJcplibGwg&oe=685B601C',
            }}
          />
        </View>
      </View>
      <View
        style={{
          height: 80,
        }}
      />

      <View style={styles.information}>
        <Text
          style={{
            fontSize: FONT_SIZE.titleMedium,
            color: theme.text2,
            fontWeight: 'bold',
          }}>
          Hoang Van Hung
        </Text>
        <Text
          style={{
            fontSize: FONT_SIZE.bodyLarge,
            color: theme.text3,
            fontWeight: 'bold',
          }}>
          0987654321
        </Text>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
            gap: 10,
          }}>
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
            onPress={handleMessageDetail}>
            <Text
              style={{
                color: theme.text2,
                borderColor: theme.borderColor,
                fontSize: FONT_SIZE.bodyLarge,
              }}>
                {t('userProfile.Message')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openReportSheet}
            style={[
              styles.button,
              {
                height: 50,
                width: 50,
                backgroundColor: theme.background,
              },
            ]}>
            <IconShowMore color={theme.iconColor} />
          </TouchableOpacity>
        </View>
        <Margin top={2} />
        <Text
          style={{
            fontSize: FONT_SIZE.bodyLarge,
            color: theme.text2,
            fontWeight: 'bold',
          }}>
            {t('userProfile.bio')}
        </Text>
        <TextCollapse
          description={
            'Tôi là một lập trình viên đam mê công nghệ với hơn 2 năm kinh nghiệm phát triển ứng dụng di động sử dụng React Native. Tôi có nền tảng vững chắc về lập trình Front-end lẫn Back-end, từng đảm nhiệm vai trò trưởng nhóm trong các dự án thực tế như ShopZoe – một ứng dụng mua sắm trực tuyến, và Mi Food App – nền tảng đặt đồ ăn tiện lợi.'
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 30,
  },
  information: {
    padding: 15,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  button: {
    borderRadius: 8,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    elevation: 6,
    justifyContent: 'center',
  },
  frameInformation: {
    flexDirection: 'row',
    zIndex: 1,
    position: 'absolute',
    bottom: -75,
    alignItems: 'center',
    left: 15,
  },
  coverPicture: {
    width: width,
    height: 250,
    resizeMode: 'cover',
  },
  coverPictureFrame: {
    position: 'relative',
    width: width,
  },
  text: {
    fontSize: 20,
  },
});

export default UserProfile;
