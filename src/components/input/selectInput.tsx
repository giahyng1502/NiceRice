import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    FlatList,
    Pressable,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import Margin from '../margin/magin';
import IconArrowDown from "../../assets/svgs/ic_arrow_down";

type Props = {
    item: string;
    setItem: (value: string) => void;
};

const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
];

const SelectInputModal: React.FC<Props> = ({ item, setItem }) => {
    const {theme} = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelect = (value: string) => {
        setItem(value);
        console.log(value)
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Margin top={1} />
            <Text style={[styles.label, { color: theme.text2 }]}>Gender</Text>
            <Margin top={1} />

            <TouchableOpacity
                style={[styles.inputContainer, { borderColor: theme.text2 }]}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.8}
            >
                <Text style={[styles.selectedText, { color: item ? theme.text2 : '#999' }]}>
                    {item ? genderOptions.find(g => g.value === item)?.label : 'Select gender'}
                </Text>

                <IconArrowDown color={theme.iconColor}/>
            </TouchableOpacity>

            <Modal
                transparent
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
                    <View style={[styles.modalContainer, { backgroundColor: theme.background }]}>
                        <Text style={[styles.modalTitle, { color: theme.text2 }]}>Select gender</Text>
                        <FlatList
                            data={genderOptions}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item: option }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => handleSelect(option.value)}
                                >
                                    <Text style={[styles.optionText, { color: theme.text2 }]}>
                                        {option.label}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

export default SelectInputModal;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 8,
        height: 50,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectedText: {
        fontSize: 16,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.0)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        padding: 16,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    option: {
        paddingVertical: 14,
    },
    optionText: {
        fontSize: 16,
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
    },
});
