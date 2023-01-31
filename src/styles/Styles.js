import { StyleSheet } from 'react-native';
import { colors, fontNames } from '../utils/ui-constants';

const textStyles = StyleSheet.create({
  heading: {
    fontFamily: fontNames.Poppins_Bold,
    color : colors.white,
    fontSize : 28
  },
  body: {
    fontFamily: fontNames.Nunito_Regular,
    fontSize: 14
  },
  white_text_button: {
    fontFamily: fontNames.Poppins_Bold,
    color : colors.white,
    fontSize : 14
  },
  gray_text_button:{
    fontFamily: fontNames.Nunito_Medium,
    color : colors.light_gray,
    fontSize : 14,
    textAlign : 'center'
  },
  robin_text_button:{
    fontFamily: fontNames.Nunito_Medium,
    color : colors.robin_egg_blue,
    fontSize : 16, 
    textAlign : 'center'

  },
});

module.exports = {
  textStyles
};
