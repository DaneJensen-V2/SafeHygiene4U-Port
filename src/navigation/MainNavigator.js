import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main } from '../screens/Main';
import { Details } from '../screens/Details';


// returns an object containing 2 properties: Screen and Navigator. 
// Both are used for configuring the navigator.
const Stack = createNativeStackNavigator();

//Navigation stack that is loaded when the user opens the app and is logged in.
export const MainNavigator = () => (
  
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Main" component={Main} />
    <Stack.Screen name="Details" component={Details} options={{title: "Details"}} />
  </Stack.Navigator>
);

