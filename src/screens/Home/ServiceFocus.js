import React, { useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Platform,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, HStack, VStack, Icon, Input, Spacer } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import MapView, { Marker } from 'react-native-maps';
import StarRating from 'react-native-star-rating-widget';
import { colors, fontNames, icons } from '../../utils/ui-constants';

export default function ServiceFocus() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
        padding: 10,
        paddingTop: Platform.OS === 'android' ? 45 : 0,
      }}
    />
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heading: {
    fontFamily: fontNames.Poppins_Bold,
    color: colors.black,
    fontSize: 30,
  },
  itemHeading: {
    fontFamily: fontNames.Poppins_SemiBold,
    color: colors.black,
    fontSize: 22,
  },
  distanceText: {
    fontFamily: fontNames.Poppins_Light,
    color: colors.light_gray,
    fontSize: 17,
  },
  item: {
    marginVertical: 4,
    height: 100,
    justifyContent: 'center',
  },
  header: {
    fontSize: 16,
    backgroundColor: '#fff',
    color: colors.light_gray,
    fontFamily: fontNames.Poppins_Regular,
  },
  title: {
    fontSize: 24,
  },
  list: {
    position: 'absolute',
    top: 150,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
