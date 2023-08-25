import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  HStack,
  Input,
  KeyboardAvoidingView,
  keyboardDismissHandlerManager,
  ScrollView,
  Spacer,
  VStack,
} from 'native-base';
import RepurpostGradient from '../../components/background-gradient';
import { textStyles } from '../../styles/Styles';
import LoginForm from '../../components/forms/login-form';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { colors, fontNames } from '../../utils/ui-constants';

// Shell for the "Login" auth screen
export function About({}) {
  // TODO: AuthenticationContext working
  // const { onLogin } = useContext(AuthenticationContext);

  const navigation = useNavigation();
  // REPLACE WITH AUTH

  // contains buttons to sign in (which would first auth the user then take them to the main nav stack),
  // to create an account, and go to
  return (
    <ScrollView style={{ backgroundColor: colors.white }}>
      <VStack alignItems='center'>
        <HStack paddingX={8}>
          <Image
            source={require('../../../assets/logo-white.png')}
            style={{ width: 140, height: 140 }}
          />
          <Spacer></Spacer>
          <Image
            source={require('../../../assets/ASU-logo.png')}
            style={{ width: 200, height: 140 }}
          />
        </HStack>
        <Text style={styles.welcome}> What is SafeHygiene4U?</Text>
        <Text style={styles.body}>
          SafeHygiene4U is an open source project designed to connect families experiencing
          homelessness in the Phoenix area to safe hygiene services. Many of the services listed are
          unknown to many and were discovered with the help of community partners from the public,
          non-profit, and private sectors in the Phoenix area. It is our hope that by providing
          information on showering, bathroom, and clothing services that are free or low-cost,
          families experiencing homplessness will have access to services that were otherwise
          forgotten.
        </Text>
        <Text style={styles.welcome}> What locations do we support?</Text>
        <Text style={styles.body}>
          We currently only support the Phoenix area but are always looking to add more locations
        </Text>
        <Text style={styles.welcome}> Who are we?</Text>
        <Text style={styles.body}>
          This app was created by a group of students from ASU with funding by Apple focused on
          helping the homeless community by providing a source of information that will ease their
          quality of lives. We make no money from this app.
        </Text>
        <Text style={styles.welcome}> Contact Us</Text>
        <VStack space={0}>
          <Text style={styles.body}>If you wish to partner with us, reach out to:</Text>
          <Button
            variant={'link'}
            onPress={() => Linking.openURL('mailto:info.safehygiene4u@gmail.com')}
            title=''
          >
            info.safehygiene4u@gmail.com
          </Button>
        </VStack>
      </VStack>
    </ScrollView>
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
  body: {
    fontFamily: fontNames.Poppins_Regular,
    color: colors.black,
    fontSize: 14,
    paddingHorizontal: 5,
    paddingTop: 5,
    textAlign: 'center',
  },
});
