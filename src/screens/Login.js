import React from 'react';
import { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RepurpostGradient from '../components/background-gradient';
import { useNavigation } from '@react-navigation/native';
import { textStyles } from '../styles/Styles';
import { colors } from '../utils/ui-constants';
import TextButton from '../components/buttons/text-button';
import MainButton from '../components/buttons/main-button';
import LoginForm from '../components/forms/login-form';
import { AuthenticationContext } from '../context/AuthenticationContext';
import { keyboardDismissHandlerManager } from 'native-base';

//Shell for the "Login" auth screen
export const Login = ({}) => {
  const { onLogin } = useContext(AuthenticationContext);
  const navigation = useNavigation();
  //REPLACE WITH AUTH
  const Login = () => {
    onLogin();
  };
  const forgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };
  const createAccount = () => {
    navigation.navigate('Register');
  };

  //dismiss keyboard
  const onPressOut = () => {
    Keyboard.dismiss();
  };

  //contains buttons to sign in (which would first auth the user then take them to the main nav stack),
  //to create an account, and go to
  return (
    <TouchableWithoutFeedback onPressOut={onPressOut}>
      <View style={styles.container}>
        <RepurpostGradient />
        <Text style={textStyles.heading}>Welcome back!👋</Text>
        <LoginForm />
        {/* <View style={styles.loginCard}>
            <MainButton text="Sign In" onPress={Login} bgColor={colors.robin_egg_blue}/>
            <TextButton text="Forgot Password" onPress={forgotPassword} textStyle={textStyles.gray_text_button}/>
            <TextButton text="Create an account" onPress={createAccount} textStyle={textStyles.robin_text_button}/>
            <StatusBar style="auto" />
          </View> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

//Gets dimensions of users current device
const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //white background view behind the Auth forms
  loginCard: {
    width: deviceWidth - 65,
    height: 400,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
