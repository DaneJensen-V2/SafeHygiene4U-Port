import React, { useEffect, useState, useContext } from 'react';
import { NativeBaseProvider } from 'native-base';
import RepurpostBrandTheme from '../context/repurpost-brand-theme';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from '../navigation/MainNavigator';
import { AuthNavigator } from '../navigation/AuthNavigator';
import { AuthenticationContextProvider, useAuth } from '../context/AuthenticationContext';
import { library } from '@fortawesome/fontawesome-svg-core';


import { 
  Poppins_300Light,
  Poppins_400Regular, 
  Poppins_600SemiBold, 
  Poppins_700Bold 
} from '@expo-google-fonts/poppins';
import { 
  Nunito_400Regular, 
  Nunito_500Medium,
  Nunito_700Bold 
} from '@expo-google-fonts/nunito';

import {
  faEnvelope,
  faCircleXmark,
  faEye,
  faEyeSlash,
  faUser,
  faLightbulb,
  faRectangleList, 
  faClock
} from '@fortawesome/free-regular-svg-icons';

import * as Font from 'expo-font';
import { faBars, faBolt, faGear, faShareNodes, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

// keep the splash screen visible until we have completed all async processing
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { isAuthenticated, onAppOpen } = useAuth();

  useEffect(() => {
    // define a function to load resources that we'll need.
    // right now, this is blank because it hasn't been implemented,
    // but in the future, we'll use this function to check login state,
    // load in preferences, etc.
    const prepare = async () => {
      library.add(faEnvelope);
      try {
        // load icons
        library.add(...[
          faEnvelope,
          faCircleXmark,
          faEye,
          faEyeSlash,
          faUser,
          faGear,
          faLightbulb,
          faShareNodes, 
          faRectangleList,
          faBars,
          faTriangleExclamation,
          faClock, 
          faBolt
        ]);

        // load custom fonts
        await Font.loadAsync({
          Poppins_300Light,
          Poppins_400Regular, 
          Poppins_600SemiBold, 
          Poppins_700Bold, 
          Nunito_400Regular,
          Nunito_500Medium,
          Nunito_700Bold,
        });

        // load in icons
        library.add(faEnvelope);

        // Check to see if persisted auth tokens exist
        // IF yes, Refresh the access token and log user in.
        // if no, user not authenticated.
        await onAppOpen();
      } catch (error) {
        //catch any errors
        switch (error.message) {
          default:
            console.error(
              'Encountered an unexpected error at the root level.',
              error.stack,
              error.message
            );
            break;
        }
      } finally {
        // App is ready to render, so state is updated
        setAppIsReady(true);
      }
    };

    // call function
    prepare();
  }, []);

  // this hook hides the splash screen once the
  // app is ready to be rendered
  const splashVisibilityControl = useEffect(() => {
    const hideSplashWhenReady = async () => {
      if (appIsReady) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplashWhenReady();
  }, [appIsReady]);

  // if the app isn't ready to be rendered, don't render anything
  if (!appIsReady) return null;

  // otherwise, return the actual app content
  return <>{isAuthenticated ? <MainNavigator /> : <AuthNavigator />}</>;
};

const AppWithContext = () => {
  return (
    <NavigationContainer>
      <AuthenticationContextProvider>
        <NativeBaseProvider theme={RepurpostBrandTheme}>
          <App />
        </NativeBaseProvider>
      </AuthenticationContextProvider>
    </NavigationContainer>
  );
};

export default AppWithContext;

module.exports = {
  App,
  AppWithContext,
};
