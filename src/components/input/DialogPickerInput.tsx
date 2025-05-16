import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Margin from '../margin/magin';
import { useTheme } from '../../hooks/useTheme';
import IconCalendar from '../../assets/svgs/ic_calendar';
import Modal from 'react-native-modal';

type Props = {
    date: Date;
    setDate: (date: Date) => void;
};

const DatePickerExample: React.FC<Props> = ({ date, setDate }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <Margin top={1} />
            <Text style={{ color: theme.text2 }}>Ngày sinh</Text>
            <Margin top={1} />

            <View style={styles.inputContainer}>
                <Text style={[styles.dateText, { color: theme.text2 }]}>
                    {date.toLocaleDateString()}
                </Text>
                <TouchableOpacity onPress={() => setOpen(true)} style={styles.iconButton}>
                    <IconCalendar />
                </TouchableOpacity>
            </View>

            <Modal
                isVisible={open}
                onBackdropPress={() => setOpen(false)}
                backdropOpacity={0.5}
                style={styles.modal}
                animationIn="fadeInLeft"
                animationOut="fadeOutRight"
                useNativeDriver
            >
                <View style={[styles.modalContent,{backgroundColor: theme.bottomSheetColor}]}>
                    <Text style={[styles.modalTitle,{color : theme.text2}]}>Select Birthday</Text>
                    <DatePicker
                        date={date}
                        onDateChange={setDate}
                        mode="date"
                        dividerColor={theme.text2}
                    />
                    <TouchableOpacity
                        onPress={() => setOpen(false)}
                        style={styles.confirmButton}
                    >
                        <Text style={{ color: theme.text2 }}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};
export default DatePickerExample;
const styles = StyleSheet.create({
    container: {
        width : '100%'
    },
    inputContainer: {
        borderRadius: 8,
        borderWidth: 1,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#8688A1',
        paddingHorizontal: 12,
        justifyContent: 'space-between',
    },
    dateText: {
        fontSize: 16,
    },
    iconButton: {
        padding: 6,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    confirmButton: {
        marginTop: 20,
        backgroundColor: '#0099ff',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
});
