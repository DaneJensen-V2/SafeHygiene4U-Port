import React from "react";
import  { useContext } from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import RepurpostGradient from '../components/background-gradient';
import { useNavigation } from '@react-navigation/native';
import {textStyles} from '../styles/Styles'
import { colors } from "../utils/ui-constants";
import TextButton from "../components/buttons/text-button";
import MainButton from "../components/buttons/main-button";
import TextBox from '../components/input/text-box';
import { useAuth } from "../context/AuthenticationContext";

//Shell for the "Login" auth screen
export const Login = ({}) =>{

  const { fakeLogin } = useAuth();
  const navigation = useNavigation();
  const forgotPassword = () => {
    navigation.navigate("ForgotPassword");
  }
  const createAccount = () => {
    navigation.navigate("Register");
  }
  //contains buttons to sign in (which would first auth the user then take them to the main nav stack),
  //to create an account, and go to 
    return (
    <View style={styles.container}>
      <RepurpostGradient />
      <View style={styles.loginCard}>
        <TextBox />
        <MainButton text="Sign In" onPress={fakeLogin} bgColor={colors.robin_egg_blue}/>
        <TextButton text="Forgot Password" onPress={forgotPassword} textStyle={textStyles.gray_text_button}/>
        <TextButton text="Create an account" onPress={createAccount} textStyle={textStyles.robin_text_button}/>
        <StatusBar style="auto" />
      </View>
   </View>
    );
  }

//Gets dimensions of users current device
  const deviceWidth = Math.round(Dimensions.get('window').width)

  const styles = StyleSheet.create({ 
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    //white background view behind the Auth forms
    loginCard: {
      width : deviceWidth - 65,
      height: 400,
      borderRadius: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
