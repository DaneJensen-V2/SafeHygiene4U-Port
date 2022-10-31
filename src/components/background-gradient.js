import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from 'react-native';
import { useTheme } from 'native-base'
;
const RepurpostGradient = () => {
  //get the colors from the theme using NativeBaseProvider's useTheme() hook
  const { colors } = useTheme();
  
    return (
        <LinearGradient
          // Background Linear Gradient
            colors={[colors.medium_purple, colors.bright_turquoise]}
            style={styles.background}
            start={ {x: 0.2, y: 0.1} }
            end={ {x: 0.8, y: 0.9} }
      />
    );
};

const styles = StyleSheet.create({
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: '100%',
      elevation: -1,
    },
});

export default RepurpostGradient;
