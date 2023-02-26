/* eslint-disable react/prop-types */
import * as React from 'react';
import { Image } from 'react-native';
import { Menu, Button, Icon, ChevronDownIcon, Center } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { colors, icons, fontNames } from '../../utils/ui-constants';
// Custom header for navigation. This one is implemented in the home screen

// Lowercase logo for center of nav bar

export function LogoTitle() {
  return (
    <Image
      style={{ width: 150, height: 50, resizeMode: 'contain' }}
      source={require('../../../assets/logo-full-lower.png')}
    />
  );
}

// Button for selecting a workspace
export function WorkspaceSelectButton() {
  const handMenuItemSelect = (menuItem) => {
    // TODO: Implement logic for selecting workspace here
  };

  // TODO: Menu items are hardcoded, dynamically load them from user data
  return (
    <Menu w='200' trigger={(triggerProps) => <WorkspaceButton test={triggerProps} />}>
      <Menu.Item _text={{ color: colors.robin_egg_blue }}>Workspace 1</Menu.Item>
      <Menu.Item _text={{ color: colors.robin_egg_blue }}>Workspace 2</Menu.Item>
      <Menu.Item _text={{ color: colors.robin_egg_blue }}>Workspace 3</Menu.Item>
    </Menu>
  );
}

function WorkspaceButton({ test }) {
  return (
    <Button
      rightIcon={<ChevronDownIcon mt='0.5' color={colors.robin_egg_blue}></ChevronDownIcon>}
      backgroundColor={colors.white}
      rounded='md'
      variant='solid'
      marginRight={0}
      height={9}
      width={110}
      testID='main-button'
      {...test}
      textAlign='center'
      _text={{
        color: colors.robin_egg_blue,
        fontFamily: fontNames.Poppins_Regular,
        color: colors.robin_egg_blue,
        fontSize: 12,
        textAlign: 'center',
      }}
    >
      Workspaces
    </Button>
  );
}

// Top left menu button, will be used for drawer navigation later
export function MenuButton() {
  return (
    <Button
      leftIcon={
        <Icon
          as={
            <FontAwesomeIcon
              icon={icons.bars}
              size={30}
              color={colors.robin_egg_blue}
              transform='shrink-5'
            />
          }
        />
      }
      backgroundColor={colors.white}
      rounded='full'
      variant='solid'
      marginRight={2}
      height={9}
      width={9}
      testID='main-button'
    />
  );
}
