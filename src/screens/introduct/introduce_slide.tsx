import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from "../../hooks/useTheme";
import {globalStyles} from "../../styles/globalStyles";
import {Theme} from "../../store/types/theme";

type Props = {
    image: React.ReactNode;
    title: string;
    content: string;
    color: any;
};

const IntroduceSlice: React.FC<Props> = ({image, title, content,color}) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>{image}</View>
            <Text style={[styles.title,globalStyles.title,{color: color.text}]}>{title}</Text>
            <Text style={[globalStyles.contentSize,{color : color.text}]}>{content}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    content: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
    },
});

export default IntroduceSlice;
