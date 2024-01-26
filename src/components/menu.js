import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, Linking } from 'react-native';
import { colors, fontNames, icons } from '../utils/ui-constants';
import { Button, HStack, Icon, VStack } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { useAuthentication } from '../context/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';
import { UserData } from '../context/userData';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: colors.logoBlue,
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 40,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    paddingTop: 5,
    color: colors.white,
    fontSize: 22,
    fontFamily: fontNames.Poppins_Bold,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
  email: {
    paddingTop: 7,
    paddingLeft: 2,
    color: colors.white,
    fontSize: 14,
    fontFamily: fontNames.Poppins_Regular,
  },
});

export default function Menu(onItemSelected, test) {
  const navigation = useNavigation();
  const { user } = useAuthentication();
  const auth = getAuth();
  const userData = UserData();


  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <VStack style={styles.avatarContainer}>
        <HStack space={3}>
          <Icon as={<FontAwesomeIcon icon={icons.circleUser} size={40} color={colors.white} />} />
          <Text style={styles.name}>{user ? (userData ? userData.Username : '') : ''}</Text>
        </HStack>
        <Text style={styles.email}>{user ? user.email : 'Not Signed In'}</Text>
      </VStack>
      {user ? (
        <VStack space={2}>
          <MenuItem
            text='Map'
            icon={icons.faMap}
            bgColor={colors.logoBlue}
            onPress={() => {}}
          ></MenuItem>
          <MenuItem
            text='Favorites'
            icon={icons.star}
            bgColor={colors.logoBlue}
            onPress={() => {
              navigation.navigate('Favorites', {
                favorites: userData.favorites,
              });
            }}
          ></MenuItem>
          <MenuItem
            text='Suggest a Location'
            icon={icons.compass}
            bgColor={colors.logoBlue}
            onPress={() => {
              Linking.canOpenURL(
                'https://docs.google.com/forms/d/e/1FAIpQLSdbxoWU08oIgeQ_DxLz3GqV8hDJGctRwwECAT3v3da-JTXknA/viewform?usp=sf_link'
              ).then((supported) => {
                if (supported) {
                  Linking.openURL(
                    'https://docs.google.com/forms/d/e/1FAIpQLSdbxoWU08oIgeQ_DxLz3GqV8hDJGctRwwECAT3v3da-JTXknA/viewform?usp=sf_link'
                  );
                } else {
                  console.log("Don't know how to open URI: " + this.props.url);
                }
              });
            }}
          ></MenuItem>
          <MenuItem
            text='Logout'
            icon={icons.user}
            bgColor={colors.logoBlue}
            onPress={() => {
              signOut(auth)
                .then(() => {
                  // Sign-out successful.
                  userData.deleteData();
                })
                .catch((error) => {
                  // An error happened.
                });
            }}
          ></MenuItem>
          <MenuItem
            text='About'
            icon={icons.question}
            bgColor={colors.logoBlue}
            onPress={() => {
              navigation.navigate('About');
            }}
          ></MenuItem>
        </VStack>
      ) : (
        <VStack space={2}>
          <MenuItem text='Map' icon={icons.faMap} bgColor={colors.logoBlue}></MenuItem>
          <MenuItem
            text='Login'
            icon={icons.user}
            bgColor={colors.logoBlue}
            onPress={() => {
              navigation.navigate('MainAuth');
            }}
          ></MenuItem>
          <MenuItem
            text='About'
            icon={icons.question}
            bgColor={colors.logoBlue}
            onPress={() => {
              navigation.navigate('About');
            }}
          ></MenuItem>
        </VStack>
      )}
    </ScrollView>
  );

  function MenuItem({ text, icon, onPress, bgColor }) {
    //method to handle the logic when button is pressed
    const handleButtonPress = () => {
      onPress();
    };

    return (
      <Button
        w='65%'
        height={39}
        leftIcon={<FontAwesomeIcon icon={icon} size={25} color={colors.white} />}
        backgroundColor={colors.darkBlue}
        variant='solid'
        onPress={() => handleButtonPress()}
      >
        {text}
      </Button>
    );
  }
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
