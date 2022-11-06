import { extendTheme, NativeBaseProvider } from 'native-base';

// included this theme definition as its own component
// that we can add to from this file. It would get too messy
// staying in the App.js file. 
const RepurpostBrandTheme = extendTheme({
    colors: {
      //these colors are from Repurpost brand style guide
      robin_egg_blue: "#00D6BA",
      bright_turquoise: "#00F5D4",
      medium_purple: "#9B5DE5",
      brilliant_rose: "#F15BB5",
      cerulean: "00BBF9",
      bright_sun: "#FEE440",
      ebony_clay: "#253342",
      pickled_bluewood: "#33475B",
      white: "#FFFFFF",
      catskill_white: "#EAF0F6"
    },
    fontConfig: {
      //define font sizes
      Poppins: {
        400: {
          normal: 'Poppins-Regular',
          italic: 'Poppins-Italic',
        },
        500: {
          normal: 'Poppins-Medium',
          italic: 'Poppins-MediumItalic',
        },
        600: {
          normal: 'Poppins-SemiBold',
          italic: 'Poppins-SemiBoldItalic',
        },
        700: {
          normal: 'Poppins-Bold',
          italic: 'Poppins-BoldItalic',
        },
      },
    },
    fonts: {
      //defines fonts being used
      heading: 'Nunito',
      body: 'Nunito',
      mono: 'Nunito',
    },
    config: {
      dependencies: {
        // linear gradient dependency, if we want to 
        // fill a UI item with a gradient
        "linear-gradient": require("expo-linear-gradient").LinearGradient
      },
    },
});

export default RepurpostBrandTheme;