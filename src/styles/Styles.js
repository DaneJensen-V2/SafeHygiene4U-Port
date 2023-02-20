import { StyleSheet } from 'react-native';
import { colors, fontNames } from '../utils/ui-constants';

const textStyles = StyleSheet.create({
  heading: {
    fontFamily: fontNames.Poppins_Bold,
    color: colors.white,
    fontSize: 16,
  },
  body: {
    fontFamily: fontNames.Nunito_Regular,
  },
  terms_and_conditions_text: {
    fontFamily: fontNames.Nunito_Regular,
  },
  gray_text_button: {
    fontFamily: fontNames.Nunito_Medium,
    color: colors.light_gray,
    fontSize: 14,
    textAlign: 'center',
  },
  robin_text_button: {
    fontFamily: fontNames.Nunito_Medium,
    color: colors.robin_egg_blue,
    fontSize: 16,
    textAlign: 'center',
  },
  mainHeading: {
    fontFamily: fontNames.Poppins_Bold,
    color: colors.ebony_clay,
    fontSize: 28,
  },
});

module.exports = {
  textStyles,
};
