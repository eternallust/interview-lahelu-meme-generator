import {StyleSheet} from 'react-native';
import {COLORS, STRINGS} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.SCREEN_BACKGROUND,
    justifyContent: STRINGS.JUSTIFY_CONTENT.CENTER,
    alignItems: STRINGS.ALIGN_ITEMS.CENTER,
  },
});
