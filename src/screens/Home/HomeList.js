import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Platform,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, HStack, VStack, Icon, Input, Spacer } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import MapView, { Marker } from 'react-native-maps';
import StarRating from 'react-native-star-rating-widget';
import { colors, fontNames, icons } from '../../utils/ui-constants';

// Details screen, just an extra screen to demo pushing and popping screens from a stack
export default function HomeList() {
  var DATA = [
    {
      title: 'Showers',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
      title: 'Clothing',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
      title: 'Non-Profit',
      data: ['Water', 'Coke', 'Beer'],
    },
  ];

  const route = useRoute();
  const { services } = route.params;
  const [Services, setServcices] = useState([]);

  useEffect(() => {
    for (let i = 0; i < DATA.length; i++) {
      DATA[i].data = services[i];
    }
    console.log('Test');
    setServcices(DATA);
  }, []);

  function listItem(item) {
    const navigation = useNavigation();
    var icon = icons.shower;
    if (item.serviceType == 'Shower') {
      icon = icons.shower;
    } else if (item.serviceType == 'Clothing') {
      icon = icons.shirt;
    } else {
      icon = icons.sparkles;
    }

    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => {
            navigation.setOptions({ title: item.name });
            navigation.navigate('Service Details', {
              service: item,
            });
          }}
        >
          <HStack space={3}>
            <View
              style={{
                backgroundColor: colors.darkBlue,
                height: 65,
                width: 65,
                borderRadius: 65 / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesomeIcon icon={icon} size={35} color={colors.white} transform='right-1' />
            </View>
            <VStack space={1}>
              <Text numberOfLines={1} style={styles.itemHeading}>
                {item.name}
              </Text>

              <HStack space={5}>
                <HStack space={1}>
                  <FontAwesomeIcon icon={icons.locationDot} size={25} color={colors.light_gray} />
                  <Text numberOfLines={1} style={styles.distanceText}>
                    1.6 mi away
                  </Text>
                </HStack>
                <HStack space={1}>
                  <StarRating
                    style={{ paddingTop: 3 }}
                    starStyle={{ marginHorizontal: 0 }}
                    rating={0}
                    maxStars={5}
                    color={colors.starYellow}
                    starSize={20}
                    onChange={() => {
                      console.log('Test');
                    }}
                    animationConfig={{ duration: 0, scale: 1 }}
                  />
                  <Text numberOfLines={1} style={styles.distanceText}>
                    None
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </HStack>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
        padding: 10,
        paddingTop: Platform.OS === 'android' ? 45 : 0,
      }}
    >
      <View style={{ backgroundColor: colors.white, flex: 1 }}>
        <Text style={styles.heading}> All Services</Text>
        <Input
          placeholder='Search for a service'
          variant='filled'
          width='100%'
          borderRadius='10'
          py='1'
          px='2'
          InputLeftElement={
            <Icon
              ml='2'
              size='4'
              color='gray.400'
              as={
                <FontAwesomeIcon
                  icon={icons.search}
                  size={35}
                  color={colors.light_gray}
                  transform='shrink-5'
                />
              }
            />
          }
        />
        <FilterStack />
        <SectionList
          style={styles.list}
          sections={Services}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item }) => listItem(item)}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
        <Spacer />
        <RadioButton />
        <View style={{ height: 45 }} />
      </View>
    </SafeAreaView>
  );
}

function FilterStack() {
  return (
    <HStack paddingTop={3} justifyContent='center'>
      <Button
        backgroundColor={colors.logoBlue}
        shadow={2}
        width={100}
        height={35}
        borderRadius={15}
        _text={{
          fontFamily: fontNames.Poppins_Regular,
          fontSize: 14,
          color: colors.white,
          lineHeight: 17,
        }}
        onPress={() => {}}
        leftIcon={
          <Icon as={<FontAwesomeIcon icon={icons.check} size={14} color={colors.white} />} />
        }
      >
        Showers
      </Button>
      <Spacer />
      <Button
        backgroundColor={colors.logoBlue}
        width={100}
        height={35}
        borderRadius={15}
        shadow={2}
        _text={{
          fontFamily: fontNames.Poppins_Regular,
          fontSize: 14,
          color: colors.white,
          lineHeight: 16,
        }}
        onPress={() => {}}
        leftIcon={
          <Icon as={<FontAwesomeIcon icon={icons.check} size={14} color={colors.white} />} />
        }
      >
        Clothing
      </Button>
      <Spacer />
      <Button
        backgroundColor={colors.logoBlue}
        width={100}
        height={35}
        shadow={2}
        borderRadius={15}
        _text={{
          fontFamily: fontNames.Poppins_Regular,
          fontSize: 14,
          color: colors.white,
          lineHeight: 17,
        }}
        onPress={() => {}}
        leftIcon={
          <Icon as={<FontAwesomeIcon icon={icons.check} size={14} color={colors.white} />} />
        }
      >
        Non-Profit
      </Button>
    </HStack>
  );
}

function RadioButton() {
  const navigation = useNavigation();

  return (
    <HStack alignSelf='center'>
      <Button
        backgroundColor={colors.darkBlue}
        width={110}
        height={39}
        borderRightRadius={0}
        borderLeftRadius={10}
        _text={{
          fontFamily: fontNames.Poppins_Regular,
          fontSize: 14,
          textAlign: 'center',
          color: colors.light_gray,
        }}
        onPress={() => {
          console.log('You tapped the button!');
          navigation.navigate('HomeScreen');
        }}
        leftIcon={
          <Icon
            as={
              <FontAwesomeIcon
                icon={icons.faMap}
                size={40}
                color={colors.light_gray}
                transform='shrink-5'
              />
            }
          />
        }
      >
        Map
      </Button>
      <Button
        backgroundColor={colors.logoBlue}
        width={110}
        height={39}
        borderLeftRadius={0}
        borderRightRadius={10}
        _text={{
          fontFamily: fontNames.Poppins_Regular,
          fontSize: 14,
          textAlign: 'center',
          lineBreakMode: 'clip',
          numberOfLines: 1,
        }}
        leftIcon={
          <Icon
            as={
              <FontAwesomeIcon
                icon={icons.list}
                size={30}
                color={colors.white}
                transform='shrink-5'
              />
            }
          />
        }
      >
        List
      </Button>
    </HStack>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heading: {
    fontFamily: fontNames.Poppins_Bold,
    color: colors.black,
    fontSize: 30,
  },
  itemHeading: {
    fontFamily: fontNames.Poppins_SemiBold,
    color: colors.black,
    fontSize: 22,
  },
  distanceText: {
    fontFamily: fontNames.Poppins_Light,
    color: colors.light_gray,
    fontSize: 17,
  },
  item: {
    marginVertical: 4,
    height: 100,
    justifyContent: 'center',
  },
  header: {
    fontSize: 16,
    backgroundColor: '#fff',
    color: colors.light_gray,
    fontFamily: fontNames.Poppins_Regular,
  },
  title: {
    fontSize: 24,
  },
  list: {
    position: 'absolute',
    top: 150,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
