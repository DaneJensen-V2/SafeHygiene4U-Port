import { useState, useEffect } from 'react';
import { Button, Container } from 'native-base';
import { StyleSheet, Text } from 'react-native';

const HelloWorldButton = () => {
    // state and setter function to keep track of button press count
    // not all variables need to be declared as state, but valuable data
    // members should be 
    const [pressCount, setPressCount] = useState(0);
    const [buttonMessage, setButtonMessage] = useState("I have been press 0 times!");

    //method to handle the logic when button is pressed
    const handleButtonPress = () => {
        console.log(`Button clicked. New click count is ${pressCount + 1}`);
        setPressCount(pressCount + 1);
    };

    //method to return the string that the button displays
    //note: this is a contrived example but included to show how we could
    //      incorporate more complex behavior using JSX. This function gets called 
    //      every time its dependnecy array changes, and once at component render.
    useEffect(
        // the first argument is a callback function that can be called every time
        // something specific changes (its dependencies)
        () => {
            if (pressCount == 1) {
                setButtonMessage(`I have been clicked ${pressCount} time!`);
            } else setButtonMessage(`I have been clicked ${pressCount} times!`);
        },
        //this argument is the dependency array of the effect, meaning that the
        //function passed above will be called every time the pressCount variable is updated
        //triggering the above function
        [pressCount]
    );

    return (
        <Container>
            <Button 
            backgroundColor="brilliant_rose"
            variant='solid'
            onPress={handleButtonPress}
            testID='hello-world-button'>
                <Text style={styles.buttonText}>
                    { // the content of the button updates every time the "buttonMessage"
                    // state changes. 
                    buttonMessage
                    }
                </Text>
            </Button>
        </Container>
    );
};

//very simple stylesheet 
const styles = StyleSheet.create({
    buttonText: {
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
    },
  });

export default HelloWorldButton;
