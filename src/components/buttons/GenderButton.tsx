import React from "react";
import {useTranslation} from "react-i18next";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {width} from "../../styles/globalStyles";

type GenderButtonProps = {
    label: string;
    selected: boolean;
    onPress: () => void;
    theme: any;
};

const GenderButton: React.FC<GenderButtonProps> = ({
                                                       label,
                                                       selected,
                                                       onPress,
                                                       theme,
                                                   }) => {
    const {t} = useTranslation();
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.genderButton,
                {
                    backgroundColor: theme.inputBar,
                    borderColor: selected ? 'red' : 'transparent',
                    borderWidth: selected ? 1 : 0,
                },
            ]}>
            <Text style={{color: theme.text2, fontSize: 16}}>{t(label)}</Text>
        </TouchableOpacity>
    );
};
export default GenderButton;
const styles = StyleSheet.create({

    tabButton: {
        width: '50%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },

    activeIndicator: {
        height: 2,
        backgroundColor: 'red',
        width: '100%',
        marginTop: 5,
    },
    sliderContainer: {
        flexDirection: 'row',
        width: width * 2,
        flex: 1,
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    genderButton: {
        flex: 1,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
