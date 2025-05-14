import React from 'react';
import {View, ViewStyle} from 'react-native';
import {height, width} from '../../styles/globalStyles';

interface MarginProps {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  horizontal?: number;
  vertical?: number;
  size?: number;
}

const Margin: React.FC<MarginProps> = ({
  top,
  bottom,
  left,
  right,
  horizontal,
  vertical,
  size,
}) => {
  const scale = height * 0.01;

  const style: ViewStyle = {
    marginTop:
      size !== undefined
        ? size * scale
        : vertical !== undefined
        ? vertical * scale
        : top !== undefined
        ? top * scale
        : 0,

    marginBottom:
      size !== undefined
        ? size * scale
        : vertical !== undefined
        ? vertical * scale
        : bottom !== undefined
        ? bottom * scale
        : 0,

    marginLeft:
      size !== undefined
        ? size * scale
        : horizontal !== undefined
        ? horizontal * scale
        : left !== undefined
        ? left * scale
        : 0,

    marginRight:
      size !== undefined
        ? size * scale
        : horizontal !== undefined
        ? horizontal * scale
        : right !== undefined
        ? right * scale
        : 0,
  };

  return <View style={style} />;
};

export default Margin;
