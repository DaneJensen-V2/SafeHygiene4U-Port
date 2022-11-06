import { Container } from 'native-base';
import { Text, StyleSheet } from 'react-native';

const CustomFontDemo = () => {
  return (
    <Container>
      <Text style={styles.heading}>Hello World!!!</Text>
      <Text style={styles.body}>Hello World!!!</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Poppins-Regular",
  },
  body: {
    fontFamily: "Nunito-Regular",
  },
});

export default CustomFontDemo;
