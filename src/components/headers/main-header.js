import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { Menu, Button, Icon, VStack, Select, CheckIcon, Center, NativeBaseProvider } from "native-base";
import { colors, icons } from "../../utils/ui-constants";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


//Custom header for navigation. This one is implemented in the home screen

//Lowercase logo for center of nav bar
export function LogoTitle() {
    return (
      <Image
        style={{ width: 150, height: 50, resizeMode : 'contain'}}
        source={require('../../../assets/logo-full-lower.png')}
      />
    );
  }

  //Button for selecting a workspace
  export function WorkspaceSelectButton() {
  
    const handMenuItemSelect = (menuItem) => {
      //TODO: Implement logic for selecting workspace here
    };
    
    //TODO: Menu items are hardcoded, dynamically load them from user data
    return (
        <Menu w="200"  
       trigger={triggerProps => {
          return <WorkspaceButton test={triggerProps}>
                
                </WorkspaceButton>;
        }}>
          
          
            <Menu.Item>Workspace 1</Menu.Item>
            <Menu.Item>Workspace 2</Menu.Item>
            <Menu.Item>Workspace 3</Menu.Item>
          </Menu>
          
    );
  }

  
  const WorkspaceButton = ({test}) => {

    return (
            <Button 
            
            leftIcon={<Icon as={<FontAwesomeIcon icon={icons.gear} size={30} color={colors.white} transform='shrink-4' />}/>}
            backgroundColor = {colors.ebony_clay}
            rounded= 'full'
            variant='solid'
            marginRight={2}
            height = {9}
            width = {9}
            testID='main-button'
            {...test}>
            </Button>
    );
  }

  //Top left menu button, will be used for drawer navigation later
  export function MenuButton() {

    return (
            <Button 
            
            leftIcon={<Icon as={<FontAwesomeIcon icon={icons.bars} size={30} color={colors.white} transform='shrink-4' />}/>}
            backgroundColor = {colors.ebony_clay}
            rounded= 'full'
            variant='solid'
            marginRight={2}
            height = {9}
            width = {9}
            testID='main-button'
            >
            </Button>
    );
  }