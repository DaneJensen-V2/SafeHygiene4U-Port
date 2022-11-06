import { Container } from 'native-base';
import { Text } from 'react-native';

const CustomFontDemoTheme = () => {
  return (
    <Container>
      <Text fontFamily="heading" fontWeight="700">This text is in Poppins-Bold</Text>
      <Text fontFamily="body">This text is in Nunito-Regular</Text>
    </Container>
  );
};

export default CustomFontDemoTheme;
