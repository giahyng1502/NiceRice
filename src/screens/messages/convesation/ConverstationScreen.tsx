import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';
import CustomHeader from '../../../navigation/CustomHeader';
import { useTheme } from '../../../hooks/useTheme';
import {fakeConversations} from "../../../models/fakeData";
import ConversationItem from "./converstation_item";
import {Conversation} from "../../../models/types";

const ConversationScreen = () => {
    const scrollY = useSharedValue(0);
    const [conrvesation, setConrvesation] = useState<Conversation[]>([])
    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
    });

    const theme = useTheme();
    useEffect(() => {
        const msg = fakeConversations.filter(c=> !c.isGroup)
        setConrvesation(msg);
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <CustomHeader
                scrollY={scrollY}
                theme={theme}
            />
            <Animated.FlatList
                data={conrvesation}
                keyExtractor={item => item.conversationId}
                renderItem={({ item }) => <ConversationItem conversation={item} />}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingTop: 80 }}
            />

        </View>
    );
};

export default ConversationScreen;

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
