import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main } from '../screens/Main';
import { Details } from '../screens/Details';
import  { HomeScreen }   from '../screens/Home/HomeScreen';
import {LogoTitle} from '../components/headers/main-header';
import {WorkspaceSelectButton, MenuButton} from '../components/headers/main-header';
import { colors } from '../utils/ui-constants';
import { IdeaMain } from '../screens/Ideas/IdeaMain';
import { SocialPost } from '../screens/SocialPost/SocialPost';
import { BlogPost } from '../screens/BlogPost';

// returns an object containing 2 properties: Screen and Navigator. 
// Both are used for configuring the navigator.
const Stack = createNativeStackNavigator();

//Navigation stack that is loaded when the user opens the app and is logged in.
export const MainNavigator = () => (
  
<Stack.Navigator  screenOptions={{
    headerShown: true
  }}>      
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerTransparent: 'true', headerStyle:{backgroundColor: colors.background_color}, headerTitle: (props) => <LogoTitle {...props} />, 
    headerRight : (props) => <WorkspaceSelectButton {...props} />, headerLeft : () => (<MenuButton />)}}
    />
    <Stack.Screen name="IdeaMain" component={IdeaMain} />
    <Stack.Screen name="SocialPost" component={SocialPost} />
    <Stack.Screen name="BlogPost" component={BlogPost} />
    <Stack.Screen name="Main" component={Main} />
    <Stack.Screen name="Details" component={Details} options={{title: "Details"}} />
  </Stack.Navigator>
);

