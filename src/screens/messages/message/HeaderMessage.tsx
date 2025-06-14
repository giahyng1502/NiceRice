import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useTheme} from '../../../hooks/useTheme';
import IconBack from '../../../assets/svgs/icon_back';
import {FONT_SIZE, globalStyles} from '../../../styles/globalStyles';
import RenderGroupAvatar from './renderGroupAvatar';
type Props = {
  handleBack: () => void;
  handleChatOption: () => void;
  title: string;
  groupAvatar: string | undefined;
  participant: any[];
};

const HeaderMessage: React.FC<Props> = ({
  handleBack,
  handleChatOption,
  title,
  participant,
  groupAvatar,
}) => {
  const {theme} = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundMessage,
        },
      ]}>
      <TouchableOpacity onPress={handleBack}>
        <IconBack color={theme.iconColor} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleChatOption}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 20,
        }}>
        {!groupAvatar ? (
          <RenderGroupAvatar
            participants={participant}
            styleAvatar={styles.avatar}
            containerStyle={styles.avatarContainer}
          />
        ) : (
          <Image source={{uri: groupAvatar}} style={styles.avatar} />
        )}
        <Text
          style={[
            {
              fontSize: FONT_SIZE.titleMedium,
              fontWeight: '900',
              color: theme.text2,
            },
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  avatarContainer: {
    width: 60,
    flexDirection: 'row',
  },
});

export default React.memo(HeaderMessage);
