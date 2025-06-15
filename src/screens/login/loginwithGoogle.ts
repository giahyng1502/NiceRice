import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

export async function onGoogleSignOut() {
  try {
    await GoogleSignin.revokeAccess(); // Revoke Google access
    await GoogleSignin.signOut(); // Sign out from Google
    await auth().signOut(); // Sign out from Firebase
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Sign-out Error:', error);
    throw error;
  }
}

export async function getDataGoogle() {
    try {
        console.log('Get Data Google');
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        console.log('GoogleSignin hasPlayServices');

        const userInfo = await GoogleSignin.signIn();
        const idToken = userInfo.data?.idToken;
        if (!idToken) {
            Alert.alert('Lỗi', 'Đăng nhập Google thất bại');
            return null;
        }

        // Tạo credential để đăng nhập Firebase
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const userCredential = await auth().signInWithCredential(googleCredential);

        // Lấy Firebase ID Token
        return await userCredential.user.getIdToken();

    } catch (e) {
        console.error('Google Sign-In error:', e);
        Alert.alert('Lỗi', 'Không thể đăng nhập bằng Google');
        return null;
    }
}

