import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  { Login }   from '../screens/Login';
import { Register }   from '../screens/Register';
import  { ForgotPassword } from '../screens/Forgot-Password';


//Navigation stack that is loaded when the user opens the app and is not logged in.
export const AuthNavigator = () => {

  // returns an object containing 2 properties: Screen and Navigator. 
  // Both are used for configuring the navigator. 
  const Stack = createNativeStackNavigator();

  //defining the screens that are present in the navigator
  const authenticationScreens = [
    {
      screenName: 'Login', 
      component: Login,
    },
    {
      screenName: 'Register', 
      component: Register,
    },
    {
      screenName: 'ForgotPassword', 
      component: ForgotPassword,
    }
  ];

  const navigatorScreenOptions = {
    //hides top navigation bar
    headerShown: false,
  };
  
  return <Stack.Navigator  screenOptions={ navigatorScreenOptions }>
    {
      authenticationScreens.map(s => 
        <Stack.Screen 
          key={s.screenName}
          name={s.screenName} 
          component={s.component}
        />
      )
    }
  </Stack.Navigator>
};
