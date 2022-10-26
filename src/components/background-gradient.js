import { LinearGradient } from "expo-linear-gradient";
import { colors } from '../utils/ui-constants'
import { StyleSheet } from 'react-native';

const RepurpostGradient = () => {
    return (
        <LinearGradient
          // Background Linear Gradient
          // note: I am not sure why we have to explicitly define the colors,
          // but it doesn't seem that this component is able to read the colors
          // properly from the Native Base theme provider, so we're using constants for now
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
