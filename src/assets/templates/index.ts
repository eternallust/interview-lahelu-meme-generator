import {ImageSourcePropType} from 'react-native';

// Template meme images using actual assets
export interface TemplateItem {
  id: string;
  name: string;
  thumbnail: ImageSourcePropType; // Proper type for require() import
  width: number;
  height: number;
}

// Template configurations using actual assets from src/assets/
export const MEME_TEMPLATES: readonly TemplateItem[] = [
  {
    id: 'drake-meme',
    name: 'Drake Pointing',
    thumbnail: require('../drake-meme.jpg'),
    width: 400,
    height: 400,
  },
  {
    id: 'batman-robin-meme',
    name: 'Batman Robin',
    thumbnail: require('../batman-robin-meme.webp'),
    width: 400,
    height: 400,
  },
  {
    id: 'passing-meme',
    name: 'Passing Meme',
    thumbnail: require('../passing-meme.webp'),
    width: 400,
    height: 400,
  },
] as const;
