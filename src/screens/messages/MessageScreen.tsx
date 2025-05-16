import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';
import CustomHeader from '../../navigation/CustomHeader';
import { useTheme } from '../../hooks/useTheme';
import CreateGroupModal from '../../modals/modal_create_group';

const DATA = Array.from({ length: 100 }, (_, i) => ({
    id: i.toString(),
    title: `Item thứ ${i + 1}`,
}));

const MessageScreen = () => {
    const scrollY = useSharedValue(0);
    const [visible, setVisible] = useState(false);

    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
    });

    const theme = useTheme();

    // khi bấm add => toggle modal
    const onAdd = () => {
        setVisible(!visible);
    };

    const renderItem = ({ item }: { item: { id: string; title: string } }) => (
        <View style={styles.item}>
            <Text>{item.title}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <CustomHeader
                scrollY={scrollY}
                theme={theme}
                visible={visible}
            />
            <Animated.FlatList
                data={DATA}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingTop: 80 }}
            />

        </View>
    );
};

export default MessageScreen;

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
});
