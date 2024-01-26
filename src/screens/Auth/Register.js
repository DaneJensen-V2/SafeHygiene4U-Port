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
import { useNavigation } from '@react-navigation/native';
import CreateAccountForm from '../../components/forms/register-form';
import { colors, fontNames } from '../../utils/ui-constants';

export const Register = ({}) => {
  //TODO: AuthenticationContext working
  //const { onLogin } = useContext(AuthenticationContext);

  const navigation = useNavigation();
  //REPLACE WITH AUTH
  const Register = () => {};
  const login = () => {
    navigation.navigate('Login');
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
        <Text style={styles.heading}>Get Started for Free</Text>
        <CreateAccountForm />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.logoBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: fontNames.Poppins_Bold,
    color: colors.white,
    fontSize: 30,
    paddingBottom: 10,
  },
});
