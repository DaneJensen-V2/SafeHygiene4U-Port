import { Button, Container } from 'native-base';
import { Text } from 'react-native';
import { textStyles } from '../../styles/Styles';

// Main button that was used in UI Mocks, has rounded corners and bold white text
// Can pass in text for the button, a function for when it is pressed, and its background color
function MainButton({ text, onPress, bgColor }) {
  // method to handle the logic when button is pressed
  const handleButtonPress = () => {
    onPress();
  };

  return (
    <Container>
      <Button
        backgroundColor={bgColor}
        rounded='full'
        shadow='4'
        variant='solid'
        marginBottom={2}
        marginTop={2}
        height={50}
        width={200}
        onPress={handleButtonPress}
        testID='main-button'
      >
        <Text style={textStyles.heading}>{text}</Text>
      </Button>
    </Container>
  );
}

export default MainButton;
