import { Text } from 'react-native';
import textStyles from '../styles/text-stylesheet';

const HelloWorldText = () => {
  return (
    <Text testID="hello-world-text" style={textStyles.heading}>Hello World!!!</Text>
  );
};

export default HelloWorldText;
