import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const WINDOW_WIDTH = windowWidth;
export const WINDOW_HEIGHT = windowHeight;
