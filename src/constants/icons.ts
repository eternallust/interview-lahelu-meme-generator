// Icon constants for the entire application
export const ICONS = {
  // Main Action Icons
  TEMPLATE: '🖼️',
  CAMERA: '📷',
  TEXT: '📝',

  // Text Element Actions
  ROTATE: '🔄',
  COPY: '📋',
  DELETE: '🗑️',
  EDIT: '✏️',
} as const;

// Icon size constants
export const ICON_SIZES = {
  SMALL: 12,
  MEDIUM: 16,
  LARGE: 20,
  EXTRA_LARGE: 24,
} as const;

// Icon types for TypeScript
export type IconName = keyof typeof ICONS;
export type IconSize = keyof typeof ICON_SIZES;
