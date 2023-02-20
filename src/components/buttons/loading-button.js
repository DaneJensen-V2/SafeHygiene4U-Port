/* eslint-disable react/react-in-jsx-scope */
import { Button, Container } from 'native-base';
import { Text } from 'react-native';
import {textStyles} from '../../styles/Styles';
import { fontNames, colors } from '../../utils/ui-constants';

// Variation of the Main Button that can show a loading variation with a spinner
// Can pass in text for the button, a function for when it is pressed, and its background color
// Can also pass in the text that displays when the button is loading, and a bool to determine if loading version is displayed
// eslint-disable-next-line react/prop-types
function LoadingButton({ text, onPress, bgColor, loadingText, isLoading }) {
  // method to handle the logic when button is pressed
  const handleButtonPress = () => {
    onPress();
  };

  return (
    <Container>
      <Button
        isLoading={isLoading}
        _loading={{
          _text: {
            fontFamily: fontNames.Poppins_Bold,
            color: colors.white,
            fontSize: 16,
          },
        }}
        isLoadingText={loadingText}
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

export default LoadingButton;
