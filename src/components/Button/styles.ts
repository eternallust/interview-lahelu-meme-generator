import {StyleSheet} from 'react-native';
import {COLORS, DIMENSIONS, STRINGS} from '../../constants';

export const styles = StyleSheet.create({
  // Base button styles
  button: {
    alignItems: STRINGS.ALIGN_ITEMS.CENTER,
    justifyContent: STRINGS.JUSTIFY_CONTENT.CENTER,
    borderRadius: DIMENSIONS.BUTTON_BORDER_RADIUS,
    flexDirection: STRINGS.FLEX_DIRECTION.ROW,
  },

  // Button Variants
  primary: {
    backgroundColor: COLORS.PRIMARY_BLUE,
    paddingHorizontal: DIMENSIONS.BUTTON_PADDING_HORIZONTAL,
    paddingVertical: DIMENSIONS.BUTTON_PADDING_VERTICAL,
  },

  secondary: {
    backgroundColor: COLORS.BUTTON_SECONDARY,
    paddingHorizontal: DIMENSIONS.BUTTON_PADDING_HORIZONTAL,
    paddingVertical: DIMENSIONS.BUTTON_PADDING_VERTICAL,
  },

  icon: {
    width: 28,
    height: 28,
    backgroundColor: COLORS.PRIMARY_BLUE,
    borderRadius: 14,
    borderWidth: DIMENSIONS.CONTROL_HANDLE_BORDER,
    borderColor: COLORS.WHITE,
    shadowColor: COLORS.SHADOW_BLACK,
    shadowOffset: {
      width: DIMENSIONS.SHADOW_OFFSET_WIDTH,
      height: DIMENSIONS.SHADOW_OFFSET_HEIGHT,
    },
    shadowOpacity: DIMENSIONS.SHADOW_OPACITY,
    shadowRadius: DIMENSIONS.SHADOW_RADIUS,
    elevation: DIMENSIONS.SHADOW_ELEVATION,
  },

  action: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_BLUE,
    paddingHorizontal: DIMENSIONS.BUTTON_PADDING_HORIZONTAL,
    paddingVertical: DIMENSIONS.BUTTON_PADDING_VERTICAL,
    borderRadius: 20,
  },

  template: {
    backgroundColor: COLORS.CANVAS_BACKGROUND,
    borderRadius: 8,
    padding: 8,
    margin: 4,
    shadowColor: COLORS.SHADOW_BLACK,
    shadowOffset: {
      width: DIMENSIONS.SHADOW_OFFSET_WIDTH,
      height: DIMENSIONS.SHADOW_OFFSET_HEIGHT,
    },
    shadowOpacity: 0.1,
    shadowRadius: DIMENSIONS.SHADOW_RADIUS,
    elevation: 2,
  },

  // Button Sizes
  small: {
    minHeight: 32,
  },

  medium: {
    minHeight: 44,
  },

  large: {
    minHeight: 56,
  },

  // Text Styles
  text: {
    fontWeight: '600',
    fontSize: DIMENSIONS.FONT_SIZE_BODY,
  },

  primaryText: {
    color: COLORS.WHITE,
  },

  secondaryText: {
    color: COLORS.TEXT_PRIMARY,
  },

  iconText: {
    color: COLORS.WHITE,
    fontSize: DIMENSIONS.FONT_SIZE_SMALL,
  },

  actionText: {
    color: COLORS.WHITE,
    fontSize: DIMENSIONS.FONT_SIZE_SMALL,
  },

  templateText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: DIMENSIONS.FONT_SIZE_SMALL,
  },

  // Icon spacing
  iconWithText: {
    marginRight: 6,
  },

  // Disabled state
  disabled: {
    opacity: 0.5,
  },
});
