import React from 'react';
import {Text, TextStyle} from 'react-native';
import {ICONS, ICON_SIZES, IconName, IconSize} from '../../constants/icons';

interface IconProps {
  name: IconName;
  size?: IconSize | number;
  color?: string;
  style?: TextStyle;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'MEDIUM',
  color,
  style,
}) => {
  const iconSize = typeof size === 'number' ? size : ICON_SIZES[size];

  return (
    <Text
      style={[
        {
          fontSize: iconSize,
          color,
        },
        style,
      ]}>
      {ICONS[name]}
    </Text>
  );
};
