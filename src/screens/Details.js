import React from "react";
import {Text,StyleSheet, View} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import MainButton from "../components/buttons/main-button";
import { colors } from "../utils/ui-constants";
import { Main } from "./Main";
import { useRoute } from '@react-navigation/native';

//Details screen, just an extra screen to demo pushing and popping screens from a stack
export const Details = () =>{

  const navigation = useNavigation();
  const route = useRoute();
  const  { screenNumber } = route.params;
  var incrementedScreen = screenNumber + 1

  //pushes new screen onto navigation stack
  const pushScreen = () => {
    Main.screenNumber += 1
    navigation.push('Details',  {
        screenNumber : incrementedScreen,
      })
  }

  //pops a screen from the navigation stack
  const popScreen = () => {
    navigation.goBack()

   }
   
   //pops entire stack 
   const popStack = () => {
    navigation.popToTop()

   }
    

    return (
      //Has a label that shows the data passed into the screen which includes its position on the stack
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Screen Number: {JSON.stringify(screenNumber)}</Text> 
          <MainButton text='Push Details Screen Again' onPress ={pushScreen} bgColor = {colors.robin_egg_blue} /> 
          <MainButton text='Go back (Pop from stack)' onPress ={popScreen} bgColor = {colors.ebony_clay} /> 
          <MainButton text='Go Home' onPress ={popStack} bgColor = {colors.medium_purple} /> 
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

  


