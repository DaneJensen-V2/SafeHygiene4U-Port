import React from 'react';
import {
  FormControl,
  VStack,
  Input,
  Square,
  Icon,
  WarningOutlineIcon,
  Pressable,
  Image,
} from 'native-base';
import { StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icons, colors } from '../../utils/ui-constants';
import { textStyles } from '../../styles/Styles';
import { useNavigation } from '@react-navigation/native';
import MainButton from '../buttons/main-button';
import TextButton from '../buttons/text-button';
import Logo from '../../../assets/logo-full.png';
import { useContext } from 'react';
import * as EmailValidator from 'email-validator';
import { useAuth } from '../../context/AuthenticationContext';

const LoginForm = () => {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [show, setShow] = React.useState(false);
  const navigation = useNavigation();
  const auth = useAuth();

  const forgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };
  const createAccount = () => {
    navigation.navigate('Register');
  };

  const validate = () => {
    let newErrors = { ...errors };

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

  function Login() {
    console.log('Submitted');
    //TEMP
    auth.onLogin(formData.email, formData.password);
  }

  const onSubmit = () => {
    validate() ? Login() : console.log('Validation failed');
  };

  return (
    <Square width='80%' height='50%' bg='white' rounded='lg' alignItems='center'>
      <VStack style={loginStyles.container} width='100%' alignItems='center'>
        <Image style={loginStyles.logo} source={Logo} alt='Logo' />
        <FormControl style={loginStyles.formControl} isRequired isInvalid={'email' in errors}>
          <Input
            style={textStyles.body}
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
            placeholder='Email'
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
        <MainButton
          style={loginStyles.mainButton}
          text='Sign In'
          onPress={onSubmit}
          bgColor={colors.robin_egg_blue}
        />
        <TextButton
          style={loginStyles.textButton}
          text='Forgot Password'
          onPress={forgotPassword}
          textStyle={textStyles.gray_text_button}
        />
        <TextButton
          style={loginStyles.textButton}
          text='Create an account'
          onPress={createAccount}
          textStyle={textStyles.robin_text_button}
        />
      </VStack>
    </Square>
  );
};

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default LoginForm;
