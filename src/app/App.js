import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import { StyleSheet, Text, View } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Hello World!!!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// This line, along with the referece to this component in app.json,
// allows us to register this component as the app root. 
export default registerRootComponent(App);