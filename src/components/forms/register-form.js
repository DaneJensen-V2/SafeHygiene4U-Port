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
  View,
  KeyboardAvoidingView,
} from 'native-base';
import { StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icons, colors } from '../../utils/ui-constants';
import { textStyles } from '../../styles/Styles';
import { useNavigation } from '@react-navigation/native';
import LoadingButton from '../buttons/loading-button';
import TextButton from '../buttons/text-button';
import * as EmailValidator from 'email-validator';

const RegisterForm = () => {
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [firstLoad, setFirstLoad] = React.useState(true);
  const navigation = useNavigation();
  const { onLogin } = useAuth();

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

  const onSubmit = async () => {
    if (firstLoad) setFirstLoad(!firstLoad);
    let formValid = validate();
    if (!formValid) {
      console.log('Create Account form validation failed.');
      return;
    }
    console.log('Login form valid. Submitting create account request with following data:');
    console.log(JSON.stringify(formData));
    let createAccountSuccessful = await createAccountRequest({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password2: formData.passwordConfirm,
    });

    if (!createAccountSuccessful) {
      //TODO: Deliver message to the user about what failed.
      return;
    }

    //otherwise, log them in!
    onLogin(formData.email, formData.password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      width='80%'
      height='55%'
      bg='white'
      rounded='lg'
      alignItems='center'
    >
      <VStack style={loginStyles.container} width='100%' alignItems='center'>
        <View style={{ height: 20 }}></View>

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
            placeholder='Username'
            onChangeText={(value) => setFormData({ ...formData, name: value })}
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
            onChangeText={(value) => setFormData({ ...formData, email: value })}
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
            onChangeText={(value) => setFormData({ ...formData, password: value })}
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
            onChangeText={(value) => setFormData({ ...formData, passwordConfirm: value })}
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
        ></FormControl>
        <LoadingButton
          style={loginStyles.mainButton}
          text='Sign Up'
          bgColor={colors.darkBlue}
          onPress={onSubmit}
          isLoading={loading}
          loadingText='Signing Up'
        />
        <TextButton
          style={loginStyles.textButton}
          text='Already have an account?
          Sign in'
          onPress={login}
          textStyle={textStyles.robin_text_button}
        />
      </VStack>
    </KeyboardAvoidingView>
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
  mainButton: {},
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
