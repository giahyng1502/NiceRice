import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {width} from '../../styles/globalStyles';

const GalleryScreen = () => {
  const [photos, setPhotos] = useState([]);
  const [hasPermission, setHasPermission] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  // ✅ Xin quyền truy cập thư viện Android đầy đủ
  const requestPermission = async () => {
    if (Platform.OS !== 'android') {
      setHasPermission(true);
      return;
    }

    const sdkVersion = Platform.Version;

    const checkPermission = async () => {
      if (sdkVersion >= 33) {
        const [imagesGranted, videoGranted] = await Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]);
        return imagesGranted && videoGranted;
      } else {
        return await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const request = async () => {
      if (sdkVersion >= 33) {
        const statuses = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]);
        return (
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        return status === PermissionsAndroid.RESULTS.GRANTED;
      }
    };

    const granted = (await checkPermission()) || (await request());
    setHasPermission(granted);
  };

  // ✅ Lấy ảnh sau khi đã xin quyền
  const fetchPhotos = async () => {
    try {
      const result = await CameraRoll.getPhotos({
        first: 100,
        assetType: 'Photos',
      });
      const photoUris = result.edges.map(edge => edge.node.image.uri);
      setPhotos(photoUris);
    } catch (err) {
      console.warn('Lỗi khi lấy ảnh:', err);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (hasPermission) {
      fetchPhotos();
    }
  }, [hasPermission]);

  const renderItem = ({item}) => {
    const isSelected = selectedPhoto === item;

    return (
      <TouchableOpacity style={{position: 'relative'}}>
        <Image
          source={{uri: item}}
          style={{
            width: width * 0.3,
            height: 120,
            margin: 2,
            borderRadius: 10,
            opacity: isSelected ? 0.8 : 1,
          }}
        />

        <Pressable
          onPress={() => {
            setSelectedPhoto(isSelected ? null : item); // chọn hoặc bỏ chọn
          }}
          style={{
            position: 'absolute',
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: isSelected ? '#6071ff' : 'transparent',
            borderWidth: 2,
            borderColor: 'white',
            top: 10,
            right: 10,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, padding: 15, width: width}}>
      {hasPermission ? (
        <FlatList
          data={photos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      ) : (
        <Text style={{textAlign: 'center', marginTop: 50}}>
          Không có quyền truy cập ảnh hoặc quyền chưa được cấp.
        </Text>
      )}
    </View>
  );
};

export default GalleryScreen;
