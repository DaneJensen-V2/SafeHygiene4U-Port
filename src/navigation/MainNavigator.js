import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main } from '../screens/Main';
import { Details } from '../screens/Details';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { LogoTitle, WorkspaceSelectButton, MenuButton } from '../components/headers/main-header';
import IdeaFocus from '../screens/Ideas/IdeaFocus';
import { BackButton, AddButton } from '../components/headers/idea-header';
import { colors } from '../utils/ui-constants';
import IdeaMain from '../screens/Ideas/IdeaMain';
import { SocialPost } from '../screens/SocialPost/SocialPost';
import { BlogPost } from '../screens/BlogPost';
import EditIdea from '../screens/Ideas/EditIdea';
import CreateIdea from '../screens/Ideas/CreateIdea';
import HomeList from '../screens/Home/HomeList';
import ServiceFocus from '../screens/Home/ServiceFocus';
// returns an object containing 2 properties: Screen and Navigator.
// Both are used for configuring the navigator.

// Navigation stack that is loaded when the user opens the app and is logged in.
export default function MainNavigator() {
  // returns an object containing 2 properties: Screen and Navigator.
  // Both are used for configuring the navigator.
  const Stack = createNativeStackNavigator();

  // defining the screens that are present in the navigator
  const mainScreens = [
    {
      screenName: 'HomeScreen',
      component: HomeScreen,

      options: {
        headerTransparent: 'true',
        headerShown: false,
        animation: 'none',
        /*
        headerStyle: { backgroundColor: colors.background_color },
        headerTitle: (props) => <LogoTitle {...props} />,
        headerRight: (props) => <WorkspaceSelectButton {...props} />,
        headerLeft: () => <MenuButton />,
        */
      },
    },
    {
      screenName: 'Main',
      component: Main,
    },
    {
      screenName: 'Home List',
      component: HomeList,
      options: {
        headerTransparent: 'true',
        headerShown: false,
        animation: 'none',
      },
    },
  ];

  const navigatorScreenOptions = {
    // hides top navigation bar
    headerShown: true,
  };

  return (
    <Stack.Navigator screenOptions={navigatorScreenOptions}>
      {mainScreens.map((s) => (
        <Stack.Screen
          key={s.screenName}
          name={s.screenName}
          component={s.component}
          // the '?' operator allows us to safely reference the
          // field, and won't throw an error if not present.
          options={s?.options}
        />
      ))}
      <Stack.Screen
        name='Service Details'
        component={ServiceFocus}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
}
