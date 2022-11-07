import { StyleSheet } from 'react-native';
import { fontNames } from '../utils/ui-constants';

const textStyles = StyleSheet.create({
  heading: {
    fontFamily: fontNames.Poppins_Bold,
  },
  body: {
    fontFamily: fontNames.Nunito_Regular,
  },
});

module.exports = {
  textStyles,
};
