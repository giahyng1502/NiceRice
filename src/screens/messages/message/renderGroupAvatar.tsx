import React from 'react';
import {View, Text, StyleSheet, Image, ImageStyle, ViewStyle} from 'react-native';


type Props = {
  participants: any[];
  styleAvatar : ImageStyle,
  containerStyle : ViewStyle,
}
const RenderGroupAvatar: React.FC<Props> = ({participants,styleAvatar,containerStyle}) => {
  const extraCount = participants.length - 1;

  return (
    <View style={containerStyle}>
      {participants.slice(0, 2).map((u, index) => {
        const isLastWithExtra = index === 1 && extraCount > 0;
        return (
          <View
            key={u.userId}
            style={[
              styleAvatar,
              {
                marginLeft: index === 0 ? 0 : -35,
                zIndex: 10 + index,
                backgroundColor: 'white',
                overflow : 'hidden'
              },
            ]}>
            <Image source={{uri: u.avatarUrl}} style={styleAvatar} />
            {isLastWithExtra && (
              <View style={styles.extraOverlay}>
                <Text style={styles.extraText}>+{extraCount}</Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  extraOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  extraText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    gap: 8,
  },
});

export default React.memo(RenderGroupAvatar);
