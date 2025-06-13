import React from 'react';
import {TouchableOpacity, Text, ViewStyle, TextStyle} from 'react-native';
import {Icon} from '../Icon';
import {IconName} from '../../constants/icons';
import {styles} from './styles';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'icon'
  | 'action'
  | 'template';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title?: string;
  icon?: IconName;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconColor?: string;
  activeOpacity?: number;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  icon,
  variant = 'primary',
  size = 'medium',
  onPress,
  disabled = false,
  style,
  textStyle,
  iconColor,
  activeOpacity = 0.7,
}) => {
  const getButtonStyle = (): ViewStyle[] => {
    const baseStyle: ViewStyle[] = [
      styles.button,
      styles[variant],
      styles[size],
    ];
    if (disabled) baseStyle.push(styles.disabled);
    if (style) baseStyle.push(style);
    return baseStyle;
  };

  const getTextStyle = (): TextStyle[] => {
    const baseStyle: TextStyle[] = [styles.text, styles[`${variant}Text`]];
    if (textStyle) baseStyle.push(textStyle);
    return baseStyle;
  };

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 'SMALL' as const;
      case 'large':
        return 'LARGE' as const;
      default:
        return 'MEDIUM' as const;
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}>
      {icon && (
        <Icon
          name={icon}
          size={getIconSize()}
          color={iconColor || (variant === 'primary' ? '#FFFFFF' : '#4A90E2')}
          style={title ? styles.iconWithText : undefined}
        />
      )}
      {title && <Text style={getTextStyle()}>{title}</Text>}
    </TouchableOpacity>
  );
};
