import React, { useEffect, useState, useContext } from 'react';
import { NativeBaseProvider } from 'native-base';
import RepurpostBrandTheme from '../context/repurpost-brand-theme';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from '../navigation/MainNavigator';
import { AuthNavigator } from '../navigation/AuthNavigator';
import { AuthenticationContext, AuthenticationContextProvider } from '../context/AuthenticationContext';
import { library } from '@fortawesome/fontawesome-svg-core';

import { 
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
} from '@fortawesome/free-regular-svg-icons';

import * as Font from 'expo-font';


// keep the splash screen visible until we have completed all async processing
SplashScreen.preventAutoHideAsync();


const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { isAuthenticated } = useContext(AuthenticationContext);

  useEffect(() => {
    // define a function to load resources that we'll need.
    // right now, this is blank because it hasn't been implemented,
    // but in the future, we'll use this function to check login state,
    // load in preferences, etc.
    const prepare = async () => {
      try {
        // load icons
        library.add(...[
          faEnvelope,
          faCircleXmark,
          faEye,
          faEyeSlash,
          faUser,
        ]);

        // load custom fonts
        await Font.loadAsync({
          Poppins_400Regular, 
          Poppins_600SemiBold, 
          Poppins_700Bold, 
          Nunito_400Regular,
          Nunito_500Medium, 
          Nunito_700Bold,
        });
      }
      catch {
        //catch any errors
      }
      finally {
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
  return (
    <> 
    {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </>
  );
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

  )
};

export default AppWithContext;

module.exports = {
  App,
  AppWithContext,
};
