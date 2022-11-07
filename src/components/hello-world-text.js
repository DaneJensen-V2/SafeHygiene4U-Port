import { Text } from 'react-native';
import { textStyles } from '../styles/Styles';

const HelloWorldText = () => {
  return (
    <Text 
    testID="hello-world-text" 
    style={textStyles.heading}
      >Hello World!!!
    </Text>
  );
};

export default HelloWorldText;
