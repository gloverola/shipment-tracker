import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const dimensions = {
  screenWidth: width,
  screenHeight: height,
  padding: 16,
  margin: 16,
  borderRadius: 10,
};

export default dimensions;
