import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { keyboardDismissHandlerManager } from 'native-base';
import RepurpostGradient from '../../components/background-gradient';
import { textStyles } from '../../styles/Styles';
import LoginForm from '../../components/forms/login-form';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { colors, fontNames } from '../../utils/ui-constants';

// Shell for the "Login" auth screen
export function Login({}) {
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
    <TouchableWithoutFeedback onPressOut={onPressOut}>
      <View style={styles.container}>
        <RepurpostGradient />
        <Text style={styles.heading}>Welcome back!👋</Text>
        <LoginForm />
      </View>
    </TouchableWithoutFeedback>
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
});
