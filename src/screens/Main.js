import React, {useContext} from "react";
import {StyleSheet, View} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import RepurpostGradient from '../components/background-gradient';
import { useNavigation } from '@react-navigation/native';
import HelloWorldText from '../components/hello-world-text';
import HelloWorldButton from '../components/hello-world-button';
import MainButton from "../components/buttons/main-button";
import { colors } from "../utils/ui-constants";
import { AuthenticationContext } from "../context/AuthenticationContext";


//shell for Main page that will be replaced with whatever screen the user should see after logging in
export const Main = () =>{
  const navigation = useNavigation();
  var currentScreen = 0;
  const {onLogout} = useContext(AuthenticationContext);

  const navToDetails = () => {
   navigation.navigate('Details', {
         screenNumber: currentScreen,
        })
  }
  const Logout = () => {
    onLogout();
 }
    return (
    <View style={styles.container}>
      <RepurpostGradient />
      <HelloWorldText />
      <HelloWorldButton/>
      <MainButton text='Navigate to the Next Screen' onPress ={navToDetails} bgColor = {colors.medium_purple} /> 
      <MainButton text="Logout" onPress={Logout} bgColor={colors.ebony_clay}/>
      <StatusBar style="auto" />
   </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

  
