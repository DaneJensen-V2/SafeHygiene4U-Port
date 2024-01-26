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
import {
  Button,
  Input,
  KeyboardAvoidingView,
  keyboardDismissHandlerManager,
  ScrollView,
  Spacer,
} from 'native-base';
import RepurpostGradient from '../../components/background-gradient';
import { textStyles } from '../../styles/Styles';
import LoginForm from '../../components/forms/login-form';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { colors, fontNames } from '../../utils/ui-constants';

// Shell for the "Login" auth screen
export function SignUp({}) {
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LoginForm> </LoginForm>
      <Spacer> </Spacer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 10,
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
