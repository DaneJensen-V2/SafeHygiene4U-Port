import React from 'react';
import { FormControl, VStack, Input, Button, Square, Icon, WarningOutlineIcon, Pressable } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icons } from '../../utils/ui-constants';
import * as EmailValidator from 'email-validator';

const LoginForm = () => {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [show, setShow] = React.useState(false);

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

    if (newErrors.email === null && newErrors.password=== null)
      return true;

    return false;
  };
  
  const onSubmit = () => {
    validate() ? console.log('Submitted') : console.log('Validation failed');
  };

  return (
    <Square width='80%' bg='white' rounded='md' alignItems='center'>
      <VStack width='80%' alignItems='center'>
      <FormControl isRequired isInvalid={'email' in errors}>
        <Input InputLeftElement={<Icon as={<FontAwesomeIcon icon={icons.envelope}/>}/>} placeholder='Email' onChangeText={value => setData({ ...formData, email: value})} />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} _text={{ fontSize: 'xs' }} >
          {errors.email}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={'password' in errors}>
      <Input 
       type={show ? "text" : "password"}
       InputLeftElement={<Icon as={<FontAwesomeIcon icon={icons.user}/>}/>} 
       InputRightElement={<Pressable onPress={() => setShow(!show)}><Icon as={<FontAwesomeIcon icon={show ? icons.eye : icons.eyeSlash}/>}/></Pressable>} 
       placeholder='Password' onChangeText={value => setData({ ...formData, password: value})} />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} _text={{ fontSize: 'xs' }} >
          {errors.password}
        </FormControl.ErrorMessage>
      </FormControl>
      <Button onPress={onSubmit}>
        Login
      </Button>
    </VStack>
    </Square>
    
  );
};

export default LoginForm;
