import React from "react";
import {StyleSheet, View, Text} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import RepurpostGradient from '../components/background-gradient';
import { useNavigation } from '@react-navigation/native';
import HelloWorldText from '../components/hello-world-text';
import HelloWorldButton from '../components/hello-world-button';
import MainButton from "../components/buttons/main-button";
import { colors } from "../utils/ui-constants";
import { useAuth } from "../context/AuthenticationContext";
import { getSecureKeys } from '../utils/post-auth-utils'
import { useState, useEffect } from 'react';
import { SECURE_STORE_KEYS } from "../utils/constants";
import { API_CONSTANTS } from "../utils/constants";


//shell for Main page that will be replaced with whatever screen the user should see after logging in
export const Main = () =>{
  const navigation = useNavigation();
  var currentScreen = 0;
  const { onLogout, onLogin, accessToken, getUserInfo, sessionID } = useAuth();
  const [persistedAccessTok, setPersistedAccessTok] = useState('');
  const [persistedRefreshTok, setPersistedRefreshTok] = useState('');

  const navToDetails = () => {
   navigation.navigate('Details', {
         screenNumber: currentScreen,
        })
  }
  const Logout = () => {
    onLogout();
 };

 const testEmail = 'nkastell@asu.edu';
 const testPassword = 'Kas13Stone!';

 const Login = () => {
  onLogin(testEmail,testPassword);
 }

 const displaySavedAuthKeys = async () => {
  let tokens = await getSecureKeys([
    SECURE_STORE_KEYS.ACCESS_TOKEN,
    SECURE_STORE_KEYS.REFRESH_TOKEN,
  ]);
  console.log(`Got secured keys: ${JSON.stringify(tokens)}`);
  if (tokens[SECURE_STORE_KEYS.ACCESS_TOKEN])
    setPersistedAccessTok(tokens[SECURE_STORE_KEYS.ACCESS_TOKEN]);
  if (tokens[SECURE_STORE_KEYS.REFRESH_TOKEN])
    setPersistedRefreshTok(tokens[SECURE_STORE_KEYS.REFRESH_TOKEN]);
 }

 const Info = async () => {
  getUserInfo();
 }



    return (
    <View style={styles.container}>
      <RepurpostGradient />
      <HelloWorldText />
      <HelloWorldButton/>
      <Text>
        AccessToken: {accessToken} {'\n\n'} sessionID: {sessionID}
      </Text> 
      <MainButton text='Make Login Request' onPress ={Login} bgColor = {colors.medium_purple} /> 
      <MainButton text='Log stored auth keys' onPress ={displaySavedAuthKeys} bgColor = {colors.medium_purple} /> 
      <Text>
        retrieved access token: {persistedAccessTok} {'\n\n'} retrieved refresh token: {persistedRefreshTok}
      </Text>
      <MainButton text='Navigate to the Next Screen' onPress ={navToDetails} bgColor = {colors.medium_purple} />
      <MainButton text="Logout" onPress={Logout} bgColor={colors.ebony_clay}/>
      <MainButton text="Get Info" onPress={Info} bgColor={colors.ebony_clay}/>
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
