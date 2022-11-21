import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main } from '../screens/Main';
import { Details } from '../screens/Details';

//Navigation stack that is loaded when the user opens the app and is logged in.
export const MainNavigator = () => {
  
  // returns an object containing 2 properties: Screen and Navigator. 
  // Both are used for configuring the navigator.
  const Stack = createNativeStackNavigator();

  //defining the screens that are present in the navigator
  const mainScreens = [
    {
      screenName: 'Main', 
      component: Main,
    },
    {
      screenName: 'Details', 
      component: Details,
      options: {title: "Details"},
    },
  ];

  return <>
    <Stack.Navigator headerMode="none">
      {
      mainScreens.map(s => 
        <Stack.Screen 
          key={s.screenName}
          name={s.screenName} 
          component={s.component}
          //the '?' operator allows us to safely reference the 
          //field, and won't throw an error if not present. 
          options={s?.options}
        />
      )
      }
    </Stack.Navigator>
  </>
};

