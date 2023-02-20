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
  Checkbox,
  Text,
} from 'native-base';
import { StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icons, colors } from '../../utils/ui-constants';
import { textStyles } from '../../styles/Styles';
import { useNavigation } from '@react-navigation/native';
import MainButton from '../buttons/main-button';
import TextButton from '../buttons/text-button';
import Logo from '../../../assets/logo-full-lower.png';
import * as EmailValidator from 'email-validator';

const RegisterForm = () => {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [show, setShow] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [firstLoad, setFirstLoad] = React.useState(true);
  const navigation = useNavigation();

  const login = () => {
    navigation.navigate('Login');
  };

  const openTermsAndConditions = () => {
    navigation.navigate('TermsAndConditions');
  };

  const validate = () => {
    let newErrors = { ...errors };

    if (formData.name === undefined || formData.name === '') {
      newErrors.name = 'Name is required';
      console.log('No Name');
    } else {
      newErrors.name = null;
    }

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

    if (
      formData.passwordConfirm === undefined ||
      formData.passwordConfirm === '' ||
      formData.password !== formData.passwordConfirm
    ) {
      newErrors.passwordConfirm = 'Passwords do not match';
    } else {
      newErrors.passwordConfirm = null;
    }

    setErrors(newErrors);

    if (
      newErrors.name === null &&
      newErrors.email === null &&
      newErrors.password === null &&
      newErrors.passwordConfirm === null &&
      checked === true
    )
      return true;

    return false;
  };

  const onSubmit = () => {
    if (firstLoad) setFirstLoad(!firstLoad);
    validate() ? console.log('Submitted') : console.log('Validation failed');
  };

  return (
    <Square width='80%' height='60%' bg='white' rounded='lg' alignItems='center'>
      <VStack style={loginStyles.container} width='100%' alignItems='center'>
        <Image style={loginStyles.logo} source={Logo} alt='Logo' paddingBottom={10} />
        <FormControl
          style={loginStyles.formControl}
          isRequired
          isInvalid={'name' in errors && errors.name != null}
        >
          <Input
            style={textStyles.body}
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
            placeholder='Name'
            onChangeText={(value) => setData({ ...formData, name: value })}
          />
          <FormControl.ErrorMessage
            style={textStyles.body}
            leftIcon={<WarningOutlineIcon size='sm' />}
            _text={textStyles.body}
          >
            {errors.name}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          style={loginStyles.formControl}
          isRequired
          isInvalid={'email' in errors && errors.email != null}
        >
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
        <FormControl
          style={loginStyles.formControl}
          isRequired
          isInvalid={'password' in errors && errors.password != null}
        >
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
        <FormControl
          style={loginStyles.formControl}
          isRequired
          isInvalid={'passwordConfirm' in errors && errors.passwordConfirm != null}
        >
          <Input
            style={textStyles.body}
            type='password'
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
            placeholder='Password Confirmation'
            onChangeText={(value) => setData({ ...formData, passwordConfirm: value })}
          />
          <FormControl.ErrorMessage
            leftIcon={<WarningOutlineIcon size='sm' />}
            _text={textStyles.body}
          >
            {errors.passwordConfirm}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          style={loginStyles.formControl}
          isRequired
          isInvalid={checked === false && firstLoad === false}
        >
          <Checkbox
            isChecked={checked}
            onChange={() => {
              setChecked(!checked);
            }}
          >
            <Text
              style={[textStyles.terms_and_conditions_text, { marginRight: -4 }]}
              color={colors.ebony_clay}
            >
              I agree with the
            </Text>
            <Text
              style={textStyles.terms_and_conditions_text}
              color={colors.robin_egg_blue}
              onPress={openTermsAndConditions}
            >
              terms and conditions.
            </Text>
          </Checkbox>
          <FormControl.ErrorMessage
            leftIcon={<WarningOutlineIcon size='sm' />}
            _text={textStyles.body}
          >
            Please read and accept the terms and conditions
          </FormControl.ErrorMessage>
        </FormControl>
        <MainButton
          style={loginStyles.mainButton}
          text='Sign Up'
          onPress={onSubmit}
          bgColor={colors.robin_egg_blue}
        />
        <TextButton
          style={loginStyles.textButton}
          text='Already have an account?
          Sign in'
          onPress={login}
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
    flex: 2,
  },
  formControl: {
    flex: 1,
    paddingHorizontal: 25,
  },
  logo: {
    flex: 1,
    width: '75%',
    resizeMode: 'contain',
  },
});

export default RegisterForm;
