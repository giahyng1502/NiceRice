import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {useTheme} from '../../hooks/useTheme';
import IconArrowRight from '../../assets/svgs/icon_arrow_right';

interface IProps {
    Icon: React.FC;
    title: string;
    color?: string;
}

const ItemOption: React.FC<IProps> = ({Icon, title, color}) => {
    const theme = useTheme();

    return (
        <TouchableOpacity style={styles.container}>
            <View style={{width: 30}}>
                <Icon />
            </View>
            <Text
                style={[
                    globalStyles.contentSize,
                    {color: theme.text2, fontWeight: '700',flex : 1},
                ]}>
                {title}
            </Text>
            {color ? (
                <View
                    style={{
                        backgroundColor: color,
                        width: 60,
                        height: 40,
                        borderRadius: 16,
                    }}></View>
            ) : (
                <IconArrowRight />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

export default ItemOption;
