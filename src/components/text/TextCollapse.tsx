import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {FONT_SIZE} from "../../styles/globalStyles";
import {useTheme} from "../../hooks/useTheme";
import {useTranslation} from "react-i18next";

const TextCollapse = ({description}) => {
    const {theme} = useTheme();
    const {t} = useTranslation()
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => setIsExpanded(!isExpanded);


    return (
        <View>
            <Text
                numberOfLines={isExpanded ? undefined : 5}
                style={{
                    fontSize: FONT_SIZE.bodyMedium,
                    color: theme.text2,
                }}
            >
                {description}
            </Text>

            <TouchableOpacity onPress={toggleExpanded}>
                <Text style={{ color: theme.text3, marginTop: 4,textAlign: 'justify' }}>
                    {isExpanded ? t('userProfile.less') : t('userProfile.more')}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default TextCollapse;
