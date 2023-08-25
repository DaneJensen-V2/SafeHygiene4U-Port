import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, keyboardDismissHandlerManager, Spacer } from 'native-base';
import RepurpostGradient from '../../components/background-gradient';
import { textStyles } from '../../styles/Styles';
import LoginForm from '../../components/forms/login-form';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { colors, fontNames } from '../../utils/ui-constants';

// Shell for the "Login" auth screen
export function MainAuth({}) {
  // TODO: AuthenticationContext working
  // const { onLogin } = useContext(AuthenticationContext);

  const navigation = useNavigation();
  // REPLACE WITH AUTH
  const Login = () => {
    onLogin();
  };

  // dismiss keyboard
  const onPressOut = () => {
    Keyboard.dismiss();
  };

  // contains buttons to sign in (which would first auth the user then take them to the main nav stack),
  // to create an account, and go to
  return (
    <View style={styles.container}>
      <Spacer></Spacer>
      <Image
        source={require('../../../assets/logo-white.png')}
        style={{ width: 250, height: 250 }}
      />
      <Text style={styles.welcome}> Welcome</Text>

      <Spacer> </Spacer>
      <Spacer> </Spacer>

      <Button
        borderRadius={10}
        w={'80%'}
        backgroundColor={colors.logoBlue}
        _text={{ fontFamily: fontNames.Poppins_Regular, color: colors.white, fontSize: 14 }}
      >
        Sign Up now
      </Button>
      <Button
        _text={{ fontFamily: fontNames.Poppins_Regular, color: colors.black, fontSize: 14 }}
        tintColor={colors.black}
        variant={'link'}
        onPress={() => {
          navigation.navigate('Login');
          console.log('Login');
        }}
      >
        Already have an account? Login
      </Button>
      <Spacer></Spacer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: fontNames.Poppins_Bold,
    color: colors.white,
    fontSize: 30,
  },
  welcome: {
    fontFamily: fontNames.Poppins_Bold,
    color: colors.black,
    fontSize: 24,
  },
});
