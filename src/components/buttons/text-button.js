import { Button, Container, theme } from 'native-base';
import { Text } from 'react-native';


//A button that consists of purely text, more subtle than the main button
//Can pass in text for the button, a function for when it is pressed, the style of the text 
const TextButton = ({text, onPress, textStyle}) => {
    
    //method to handle the logic when button is pressed
    const handleButtonPress = () => {
        console.log(text);
        onPress()
    };

    return (
        <Container>
            <Button 
            backgroundColor='#00000000'
            variant='solid'
            onPress={handleButtonPress}
            testID='push-screen-button'>
                <Text style={textStyle}>
                    {
                    text
                    }
                </Text>
            </Button>
        </Container>
    );
};


export default TextButton;
