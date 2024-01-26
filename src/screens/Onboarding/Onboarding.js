import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../utils/ui-constants';
import Footer from './Footer';
import Page from './page';

function Onboarding() {
  const pagerRef = useRef(null);
  const navigation = useNavigation();

  const handlePageChange = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
  };

  return (
    <View style={{ flex: 1 }}>
      <ViewPager style={{ flex: 1 }} initialPage={0} ref={pagerRef}>
        <View key='1'>
          <Page backgroundColor='#ffc93c' iconName='sun' title='Welcome to the weather app' />
          <Footer
            backgroundColor='#ffc93c'
            rightButtonLabel='Next'
            rightButtonPress={() => {
              handlePageChange(1);
            }}
          />
        </View>
        <View key='2'>
          <Page
            backgroundColor={colors.bright_turquoise}
            iconName='sun'
            title='Welcome to the weather app'
          />
          <Footer
            backgroundColor='#ffc93c'
            rightButtonLabel='Next'
            rightButtonPress={() => {
              handlePageChange(2);
            }}
            leftButtonLabel='Back'
            leftButtonPress={() => {
              handlePageChange(0);
            }}
          />
        </View>
        <View key='3'>
          <Page backgroundColor='#07689f' iconName='cloud-drizzle' title='Get updates on weather' />
          <Footer
            backgroundColor='#07689f'
            leftButtonLabel='Back'
            leftButtonPress={() => {
              handlePageChange(1);
            }}
            rightButtonLabel='Continue'
            rightButtonPress={async () => {
              await AsyncStorage.setItem('ONBOARDED', 'true');

              navigation.navigate('Home Screen');
            }}
          />
        </View>
      </ViewPager>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bright_sun,
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: colors.bright_turquoise,
    justifyContent: 'center',
  },
  container3: {
    flex: 1,
    backgroundColor: colors.brilliant_rose,
    justifyContent: 'center',
  },
});

export default Onboarding;
