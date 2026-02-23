import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GUIDELINE_BASE_WIDTH = 390;

export const scale = (size: number) => Math.round((SCREEN_WIDTH / GUIDELINE_BASE_WIDTH) * size);

export default scale;
