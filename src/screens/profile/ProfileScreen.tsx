import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {globalStyles, width} from "../../styles/globalStyles";
import IconUpdateFull from "../../assets/svgs/ic_pen_edit_full";
import {useTheme} from "../../hooks/useTheme";
import Margin from "../../components/margin/magin";
import Row from "../../components/container/Row";
import IconCoppy from "../../assets/svgs/ic_copy";
import IconUpdateOuline from "../../assets/svgs/ic_pen_edit_outline";
import IconLogout from "../../assets/svgs/ic_logout";
import EditInfoDialog from "../../modals/modal_edit_profile";

const ProfileScreen = () => {
    const theme = useTheme();
    const [isVisible, setIsVisible] = useState(false)
    // hàm copy nội dung
    const handleCopy = (value: string) => {
        Clipboard.setString(value);
    };

    return (
        <View style={[styles.container, {backgroundColor: theme.background}]}>
            <View style={styles.circle}>

                <Image source={require('../../assets/images/Avatar.png')} style={styles.avatar} />
                <View
                    style={{
                        borderRadius: 100,
                        width: width * 0.1,
                        height: width * 0.1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: theme.primary,
                        position: 'absolute',
                        top: 2,
                        right: 2,
                    }}>
                    <IconUpdateFull />
                </View>
            </View>

            <Margin top={5} />

            <Text style={[globalStyles.title, {color: theme.text2, fontWeight: '700'}]}>
                Hoang Van Hung
            </Text>

            <Margin top={5} />

            <Row styleCustom={{width: width * 0.8, justifyContent: 'space-between'}}>
                <Text style={[globalStyles.mediumText, {color: theme.text2}]}>Phone: 0987654321</Text>
                <TouchableOpacity onPress={() => handleCopy('0987654321')}>
                    <IconCoppy />
                </TouchableOpacity>
            </Row>

            <Margin top={2} />

            <Row styleCustom={{width: width * 0.8, justifyContent: 'space-between'}}>
                <Text style={[globalStyles.mediumText, {color: theme.text2}]}>Gender: Male</Text>
                <TouchableOpacity onPress={() => handleCopy('Male')}>
                    <IconCoppy />
                </TouchableOpacity>
            </Row>

            <Margin top={2} />

            <Row styleCustom={{width: width * 0.8, justifyContent: 'space-between'}}>
                <Text style={[globalStyles.mediumText, {color: theme.text2}]}>Birthday: 01/05/2002</Text>
                <TouchableOpacity onPress={() => handleCopy('01/05/2002')}>
                    <IconCoppy />
                </TouchableOpacity>
            </Row>

            <Margin top={2} />

            <Row styleCustom={{width: width * 0.8, justifyContent: 'space-between'}}>
                <Text style={[globalStyles.mediumText, {color: theme.text2}]}>
                    Email: hungcy1502@gmail.com
                </Text>
                <TouchableOpacity onPress={() => handleCopy('hungcy1502@gmail.com')}>
                    <IconCoppy />
                </TouchableOpacity>
            </Row>

            <Margin top={4} />

            <TouchableOpacity
                style={[
                    globalStyles.buttonHeight,
                    {
                        backgroundColor: theme.primary,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: width * 0.8,
                        borderRadius: 8,
                        alignItems: 'center',
                    },
                ]}
                onPress={() => {
                    setIsVisible(true)
                }}
            >
                <IconUpdateOuline />
                <Text
                    style={[
                        globalStyles.contentSize,
                        {
                            color: theme.text2,
                            marginLeft: 8,
                        },
                    ]}>
                    Edit Profile
                </Text>
            </TouchableOpacity>

            <Margin top={2} />

            <TouchableOpacity
                style={[
                    globalStyles.buttonHeight,
                    {
                        backgroundColor: '#FEECEB',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: width * 0.8,
                        borderRadius: 8,
                        alignItems: 'center',
                    },
                ]}>
                <IconLogout />
                <Text
                    style={[
                        globalStyles.contentSize,
                        {
                            color: '#F6695E',
                            marginLeft: 8,
                        },
                    ]}>
                    Logout
                </Text>
            </TouchableOpacity>

            <EditInfoDialog
                isVisible={isVisible}
                onClose={()=>{setIsVisible(false)}}
                onSave={()=>{}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: width * 0.4,
        height: 150,
        borderRadius: '100%',
        position: 'relative',
    },
    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default ProfileScreen;
