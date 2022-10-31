import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import HelloWorldText from '../components/hello-world-text';
import HelloWorldButton from '../components/hello-world-button';
import { NativeBaseProvider } from 'native-base';
import RepurpostBrandTheme from '../context/repurpost-brand-theme';
import RepurpostGradient from '../components/background-gradient';

const App = () => {
  return (
        <View style={styles.container}>
          <RepurpostGradient />
          <HelloWorldText />
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
  }
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
