import React from "react";
import {Text,StyleSheet, View} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import MainButton from "../components/buttons/main-button";
import { colors } from "../utils/ui-constants";
import { Main } from "./Main";
import { useRoute } from '@react-navigation/native';

//Details screen, just an extra screen to demo pushing and popping screens from a stack
export const BlogPost = ({}) =>{

  const navigation = useNavigation();
  const route = useRoute();

  //pushes new screen onto navigation stack
  const pushScreen = () => {
    navigation.push('Details',  {
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

  


