import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import HelloWorldText from '../components/hello-world-text';
import HelloWorldButton from '../components/hello-world-button';
import { NativeBaseProvider } from 'native-base';
import RepurpostBrandTheme from '../context/repurpost-brand-theme';
import RepurpostGradient from '../components/background-gradient';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import customFonts from '../data/custom-fonts';
import CustomFontDemo from '../components/custom-font-demo';
import CustomFontDemoTheme from '../components/custom-font-demo-theme';

// keep the splash screen visible until we have completed all async processing
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    // define a function to load resources that we'll need.
    // right now, this is blank because it hasn't been implemented,
    // but in the future, we'll use this function to check login state,
    // load in preferences, etc.
    const prepare = async () => {
      try {
        //do some async tasks

        // load in custom fonts
        await Font.loadAsync(customFonts);
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
        <View style={styles.container}>
          <RepurpostGradient />
          <HelloWorldText />
          <CustomFontDemo />
          <CustomFontDemoTheme /> 
          <HelloWorldButton />
          <StatusBar style="auto" />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppWithContext = () => {
  return (
    <NativeBaseProvider theme={RepurpostBrandTheme}>
      <App />
    </NativeBaseProvider>
  )
};

export default AppWithContext;

module.exports = {
  App,
  AppWithContext,
};
