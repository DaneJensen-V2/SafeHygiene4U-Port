import { Container } from 'native-base';
import { Text } from 'react-native';
import { useTheme } from 'native-base';

const CustomFontDemoTheme = () => {
  const { fonts } = useTheme();
  return (
    <Container>
      <Text fontFamily="heading" fontWeight="400">This text is in Poppins-Regular</Text>
      <Text fontFamily="Poppins-Bold">This text is in Poppins-Bold</Text>
    </Container>
  );
};

export default CustomFontDemoTheme;
