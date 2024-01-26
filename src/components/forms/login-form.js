import React, { useContext } from 'react';
import {
  FormControl,
  VStack,
  Input,
  Square,
  Icon,
  WarningOutlineIcon,
  Pressable,
  Image,
  Text,
  Collapse,
  Alert,
  HStack,
  IconButton,
  CloseIcon,
  Box,
  View,
  Spacer,
} from 'native-base';
import { StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import * as EmailValidator from 'email-validator';
import { icons, colors, fontNames } from '../../utils/ui-constants';
import { textStyles } from '../../styles/Styles';
import LoadingButton from '../buttons/loading-button';
import { Main } from '../../screens/Main';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function LoginForm() {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [show, setShow] = React.useState(false);
  const [alert, setAlert] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();
  const [ErrorMessage, setMessage] = React.useState('');
  const auth = getAuth();

  async function signIn() {
    if (formData.email === '' || formData.password === '') {
      console.log('Email and password are mandatory.');

      return;
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('Signed In');

      navigation.navigate('HomeScreen');
    } catch (error) {
      console.log(error);
      setAlert(true);
      setMessage('Invalid Username / Password');
      setLoading(false);
    }
  }
  const validate = () => {
    const newErrors = { ...errors };

    if (formData.email === undefined || formData.email === '') {
      newErrors.email = 'Email is required';
    } else if (!EmailValidator.validate(formData.email)) {
      newErrors.email = 'Invalid email address';
    } else {
      newErrors.email = null;
    }

    if (formData.password === undefined || formData.password === '') {
      newErrors.password = 'Password is required';
    } else {
      newErrors.password = null;
    }

    setErrors(newErrors);

    if (newErrors.email === null && newErrors.password === null) return true;

    return false;
  };

  const onSubmit = async () => {
    validate() ? await valid() : invalid();
  };

  const valid = async () => {
    console.log('Submitted');
    setLoading(true);
    signIn();
  };

  const invalid = () => {
    console.log('Validation failed');
  };

  return (
    <Square width='100%' height='100%' bg='white' rounded='lg' alignItems='center'>
      <Collapse isOpen={alert}>
        <Alert minW='350' maxW='400' status='error'>
          <VStack space={1} flexShrink={1} w='100%'>
            <HStack flexShrink={1} space={2} alignItems='center' justifyContent='space-between'>
              <HStack flexShrink={1} space={2} alignItems='center'>
                <Alert.Icon />
                <Text
                  fontSize='md'
                  fontWeight='medium'
                  _dark={{
                    color: 'coolGray.800',
                  }}
                >
                  Login Error
                </Text>
              </HStack>
              <IconButton
                variant='unstyled'
                _focus={{
                  borderWidth: 0,
                }}
                icon={<CloseIcon size='3' />}
                _icon={{
                  color: 'coolGray.600',
                }}
                onPress={() => setAlert(false)}
              />
            </HStack>
            <Box
              pl='6'
              _dark={{
                _text: {
                  color: 'coolGray.600',
                },
              }}
            >
              {ErrorMessage}
            </Box>
          </VStack>
        </Alert>
      </Collapse>
      <View style={{ height: 10 }}></View>
      <VStack space={5} style={loginStyles.container} width='100%' alignItems='center'>
        <FormControl style={loginStyles.formControl} isRequired isInvalid={'email' in errors}>
          <Text style={loginStyles.welcome}>Email</Text>
          <Input
            style={textStyles.body}
            placeholder='Email'
            InputLeftElement={
              <Icon
                as={
                  <FontAwesomeIcon
                    icon={icons.envelope}
                    size={30}
                    color={colors.light_gray}
                    transform='shrink-5 right-2'
                  />
                }
              />
            }
            onChangeText={(value) => setData({ ...formData, email: value })}
          />
          <FormControl.ErrorMessage
            style={textStyles.body}
            leftIcon={<WarningOutlineIcon size='sm' />}
            _text={textStyles.body}
          >
            {errors.email}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl style={loginStyles.formControl} isRequired isInvalid={'password' in errors}>
          <Text style={loginStyles.welcome}>Password</Text>

          <Input
            style={textStyles.body}
            type={show ? 'text' : 'password'}
            InputLeftElement={
              <Icon
                as={
                  <FontAwesomeIcon
                    icon={icons.user}
                    size={30}
                    color={colors.light_gray}
                    transform='shrink-5 right-2'
                  />
                }
              />
            }
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={
                    <FontAwesomeIcon
                      icon={show ? icons.eye : icons.eyeSlash}
                      size={30}
                      color={colors.light_gray}
                      transform='shrink-5 left-2'
                    />
                  }
                />
              </Pressable>
            }
            placeholder='Password'
            onChangeText={(value) => setData({ ...formData, password: value })}
          />
          <FormControl.ErrorMessage
            leftIcon={<WarningOutlineIcon size='sm' />}
            _text={textStyles.body}
          >
            {errors.password}
          </FormControl.ErrorMessage>
        </FormControl>
        <LoadingButton
          style={loginStyles.mainButton}
          text='Login'
          bgColor={colors.logoBlue}
          onPress={onSubmit}
          isLoading={loading}
          loadingText='Signing In'
        />
      </VStack>
      <Spacer></Spacer>
    </Square>
  );
}

const loginStyles = StyleSheet.create({
  container: {
    height: 300,
    position: 'relative',
  },
  textButton: {
    flex: 1,
  },
  mainButton: {
    flex: 1,
  },
  formControl: {
    flex: 1,
    paddingHorizontal: 25,
  },
  logo: {
    flex: 2,
    width: '75%',
    resizeMode: 'contain',
  },
  welcome: {
    paddingTop: 10,
    fontFamily: fontNames.Poppins_Bold,
    color: colors.black,
    fontSize: 24,
  },
});

export default LoginForm;
