import { Container } from 'native-base';
import { Text, StyleSheet } from 'react-native';

const CustomFontDemo = () => {
  return (
    <Container>
      <Text style={styles.heading}>This text is in Poppins-Regular</Text>
      <Text style={styles.body}>This text is in Nunito-Regular</Text>
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
