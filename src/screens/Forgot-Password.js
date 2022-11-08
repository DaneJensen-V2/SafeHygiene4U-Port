import React from "react";
import {StyleSheet, View, Text, Dimensions} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import RepurpostGradient from '../components/background-gradient';
import MainButton from '../components/buttons/main-button';
import TextButton from '../components/buttons/text-button';
import { useNavigation } from '@react-navigation/native';
import {textStyles} from '../styles/Styles'
import { colors } from "../utils/ui-constants";

//Screen shell for the "forgot password" auth screen
export const ForgotPassword = () =>{
  
  const navigation = useNavigation();


  const passwordReset = () => {
    console.log('Reset Password');
  }

  const goToLogin = () => {
    navigation.navigate("Login");
  }
//contains buttons to sign in (which would first auth the user then take them to the main nav stack),
//to create an account, and go to 
  return (
  <View style={styles.container}>
    <RepurpostGradient />
    <View style={styles.loginCard}>
      <MainButton text="Send Request" onPress={passwordReset} bgColor={colors.robin_egg_blue}/>
      <TextButton text="Sign in" onPress={goToLogin} textStyle={textStyles.robin_text_button}/>
      <StatusBar style="auto" />
    </View>
 </View>
  );
}

  const deviceWidth = Math.round(Dimensions.get('window').width)

  const styles = StyleSheet.create({ 
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginCard: {
      width : deviceWidth - 65,
      height: 325,
      borderRadius: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });