import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RepurpostGradient from '../../components/background-gradient';
import MainButton from '../../components/buttons/main-button';
import TextButton from '../../components/buttons/text-button';
import { useNavigation } from '@react-navigation/native';
import { textStyles } from '../../styles/Styles';
import { colors } from '../../utils/ui-constants';
import Webview from 'react-native-webview';
import { REPURPOST_PAGES } from '../../utils/constants';
import { TouchableWithoutFeedback } from 'react-native-web';

//Screen that opens a webview of the Terms and Conditions
export const TermsAndConditions = () => {
  const navigation = useNavigation();

  //dismiss keyboard
  const onPressOut = () => {
    Keyboard.dismiss();
  };

  const returnToRegister = () => {
    navigation.navigate('Register');
  };

  //contains buttons to sign in (which would first auth the user then take them to the main nav stack),
  //to create an account, and go to
  console.log(`Found device width: ${deviceWidth}`);
  return (
    <View style={[styles.container]}>
      <View style={[{ padding: 0, alignItems: 'center' }]}>
        <StatusBar style='auto' />
        <Webview source={{ uri: REPURPOST_PAGES.TERMS_OF_USE }} style={{ width: deviceWidth }} />
        <MainButton
          style={loginStyles.mainButton}
          text='I Accept 👍'
          onPress={returnToRegister}
          bgColor={colors.robin_egg_blue}
        />
      </View>
      <View style={{ zIndex: -1 }}>
        <RepurpostGradient />
      </View>
    </View>
  );
};

const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  textButton: {
    flex: 1,
  },
  mainButton: {
    flex: 2,
  },
  formControl: {
    flex: 1,
    paddingHorizontal: 0,
  },
  logo: {
    flex: 1,
    width: '75%',
    resizeMode: 'contain',
  },
});
