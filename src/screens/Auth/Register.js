import React, {useContext} from "react";
import {StyleSheet, View, Text, Dimensions} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AuthenticationContext } from "../../context/AuthenticationContext";

/*
import {textStyles} from '../../styles/Styles'
import { colors, icons } from "../../utils/ui-constants";
import TextButton from "../../components/buttons/text-button";
import MainButton from "../../components/buttons/main-button";
import { Stack } from "native-base";
import TextBox from "../../components/input/text-box";
import PasswordBox from "../components/input/password-box";
import { StatusBar } from 'expo-status-bar';
import RepurpostGradient from '../../components/background-gradient';
*/

//Shell for the "Login" auth screen
export const Register = ({}) =>{

  const {onLogin} = useAuth();
  const navigation = useNavigation();
    //REPLACE WITH AUTH
    const signUp = () => {
      onLogin();
    }
    const signIn = () => {
      navigation.navigate("Login");
    }

  //contains buttons to sign in (which would first auth the user then take them to the main nav stack),
  //to create an account, and go to 
    return (
      /*
    <View style={styles.container}>
      <RepurpostGradient /> 
      <View style={styles.loginCard}>
      <Stack space={4} w="75%" mx="auto">
         <TextBox placeholderText = "Name" faIcon = {icons.user} />
         <TextBox placeholderText = "Email" faIcon = {icons .envelope}  />
         <PasswordBox placeholderText = "Password" />
         <PasswordBox placeholderText = "Confirm Password" />
        </Stack>
        <MainButton text="Sign Up" onPress={signUp} bgColor={colors.robin_egg_blue}/>
        <TextButton text={"Already have an account? \n Sign in."} onPress={signIn} textStyle={textStyles.robin_text_button}/>
        <StatusBar style="auto" />
        
      </View>
   </View>
    
   */
  <View></View>
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
    loginCard: {
      width : deviceWidth - 65,
      height: 550,
      borderRadius: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

  

