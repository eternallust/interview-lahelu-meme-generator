// String constants for the entire application
export const STRINGS = {
  // UI Labels
  SAMPLE_TEXT: 'Sample Text',
  TAP_TOOLS_TO_ADD_IMAGE: 'Empty',

  // Template Names
  TEMPLATES: {
    DRAKE_POINTING: 'Drake Pointing',
    BATMAN_ROBIN: 'Batman Robin',
    PASSING_MEME: 'Passing Meme',
  },

  // Color Labels
  COLORS: {
    TEXT_COLOR_LABEL: 'Warna Text',
    BACKGROUND_COLOR_LABEL: 'Warna Background',
  },

  // Error Messages
  ERRORS: {
    USER_CANCELLED: 'User cancelled image picker',
    IMAGE_PICKER_FAILED: 'Gagal memilih gambar',
    NO_IMAGE_SELECTED: 'No image selected or missing dimensions',
  },

  // Alert Titles
  ALERT_TITLES: {
    ERROR: 'Error',
  },

  // Font Weights
  FONT_WEIGHTS: {
    NORMAL: 'normal' as const,
    BOLD: 'bold' as const,
  },

  // Positions
  TEXT_ALIGN: {
    CENTER: 'center' as const,
  },

  // Flex Direction
  FLEX_DIRECTION: {
    ROW: 'row' as const,
    COLUMN: 'column' as const,
  },

  // Position Types
  POSITION: {
    ABSOLUTE: 'absolute' as const,
    RELATIVE: 'relative' as const,
  },

  // Justify Content
  JUSTIFY_CONTENT: {
    CENTER: 'center' as const,
    FLEX_START: 'flex-start' as const,
    FLEX_END: 'flex-end' as const,
    SPACE_BETWEEN: 'space-between' as const,
  },

  // Align Items
  ALIGN_ITEMS: {
    CENTER: 'center' as const,
    FLEX_START: 'flex-start' as const,
    FLEX_END: 'flex-end' as const,
  },

  // Border Styles
  BORDER_STYLE: {
    DASHED: 'dashed' as const,
    SOLID: 'solid' as const,
  },

  // Text Align Vertical
  TEXT_ALIGN_VERTICAL: {
    TOP: 'top' as const,
    CENTER: 'center' as const,
    BOTTOM: 'bottom' as const,
  },

  // Resize Modes
  RESIZE_MODE: {
    CONTAIN: 'contain' as const,
    COVER: 'cover' as const,
  },

  // Corner Types
  CORNERS: {
    TOP_LEFT: 'topLeft' as const,
    TOP_RIGHT: 'topRight' as const,
    BOTTOM_LEFT: 'bottomLeft' as const,
    BOTTOM_RIGHT: 'bottomRight' as const,
  },

  // Keyboard Behavior
  KEYBOARD: {
    BEHAVIOR_PADDING: 'padding' as const,
    BEHAVIOR_HEIGHT: 'height' as const,
    BLUR_BEHAVIOR_RESTORE: 'restore' as const,
    INPUT_MODE: 'adjustResize' as const,
    EXTEND: 'extend' as const,
    PERSIST_TAPS: 'handled' as const,
  },

  // Media Types
  MEDIA_TYPE: {
    PHOTO: 'photo' as const,
  },

  // Platform
  PLATFORM: {
    IOS: 'ios' as const,
    ANDROID: 'android' as const,
  },

  // Overflow
  OVERFLOW: {
    HIDDEN: 'hidden' as const,
  },
} as const;
