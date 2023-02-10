import * as React from 'react';
import { Button, Icon } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { colors, icons } from '../../utils/ui-constants';

// Custom header for the Ideas page. Has plus button on the right and back button on the left.

// Button for going back to the home screen
export function BackButton() {
  const navigation = useNavigation();

  return (
    <Button
      leftIcon={
        <Icon
          as={
            <FontAwesomeIcon
              icon={icons.leftArrow}
              size={30}
              color={colors.white}
              transform='shrink-5'
            />
          }
        />
      }
      backgroundColor={colors.ebony_clay}
      rounded='full'
      variant='solid'
      marginRight={2}
      height={9}
      width={9}
      onPress={() => navigation.goBack()}
    />
  );
}

// Add button for a new idea
export function AddButton() {
  const navigation = useNavigation();

  return (
    <Button
      leftIcon={
        <Icon
          as={
            <FontAwesomeIcon
              icon={icons.plus}
              size={30}
              color={colors.white}
              transform='shrink-5'
            />
          }
        />
      }
      backgroundColor={colors.ebony_clay}
      rounded='full'
      variant='solid'
      marginRight={2}
      height={9}
      width={9}
      testID='main-button'
      onPress={() => navigation.push('Create Idea')}
    />
  );
}
