import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  { Login }   from '../screens/Auth/Login';
import { Register }   from '../screens/Auth/Register';
import  { ForgotPassword } from '../screens/Auth/Forgot-Password';


// returns an object containing 2 properties: Screen and Navigator. 
// Both are used for configuring the navigator. 
const Stack = createNativeStackNavigator();

//Navigation stack that is loaded when the user opens the app and is not logged in.
export const AuthNavigator = () => (
  //hides top navigation bar
  <Stack.Navigator  screenOptions={{
    headerShown: false
  }}>
       <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
);