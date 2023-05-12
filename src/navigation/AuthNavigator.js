import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../screens/Onboarding/Onboarding';

export default function AuthNavigator() {
  // returns an object containing 2 properties: Screen and Navigator.
  // Both are used for configuring the navigator.
  const Stack = createNativeStackNavigator();

  // defining the screens that are present in the navigator
  const authenticationScreens = [
    {
      screenName: 'Onboarding',
      component: Onboarding,
    },
  ];

  const navigatorScreenOptions = {
    // hides top navigation bar
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={navigatorScreenOptions}>
      {authenticationScreens.map((s) => (
        <Stack.Screen key={s.screenName} name={s.screenName} component={s.component} />
      ))}
    </Stack.Navigator>
  );
}
