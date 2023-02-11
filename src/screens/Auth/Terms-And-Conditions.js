import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MainButton from '../../components/buttons/main-button';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../utils/ui-constants';
import Webview from 'react-native-webview';
import { REPURPOST_PAGES } from '../../utils/constants';

//Screen that opens a webview of the Terms and Conditions
export const TermsAndConditions = () => {
  const navigation = useNavigation();

  const returnToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={[styles.container]}>
      <View style={[{ padding: 0, alignItems: 'center' }]}>
        <StatusBar style='auto' />
        <Webview
          source={{ uri: REPURPOST_PAGES.TERMS_OF_USE }}
          style={{ width: deviceWidth, marginTop: 30 }}
        />
        <View style={{ marginBottom: 20 }}>
          <MainButton
            text='Looks good 👍'
            onPress={returnToRegister}
            bgColor={colors.robin_egg_blue}
          />
        </View>
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

const termsAndConditionsStyle = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mainButton: {
    flex: 2,
  },
});
