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
  Linking,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Button,
  HStack,
  VStack,
  Icon,
  Input,
  Spacer,
  Skeleton,
  Center,
  ScrollView,
} from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import MapView, { Marker } from 'react-native-maps';
import StarRating from 'react-native-star-rating-widget';
import { colors, fontNames, icons } from '../../utils/ui-constants';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';

export default function ServiceFocus() {
  const route = useRoute();
  const navigation = useNavigation();
  const { service, reviews } = route.params;
  const [image, setImage] = useState('');
  const [fullService, setFullService] = useState();
  const [loaded, setLoaded] = useState(false);
  const [hours, setHours] = useState('');
  const now = new Date();

  const getData = async () => {
    const querySnapshot2 = await getDoc(doc(db, 'Test', service.name));
    let fullService = querySnapshot2.data();
    setFullService(fullService);
    const hours = fullService.hours.split(',');
    var fullHours = hours[now.getDay() - 1];
    var index = fullHours.indexOf(':'); // Gets the first index where a space occours
    var text = fullHours.slice(index + 1); // Gets the text part
    console.log(text);
    setHours(text);
    console.log(fullService.name);
    setLoaded(true);
  };

  useEffect(() => {
    navigation.setOptions({ title: service.name });

    getData();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <>
        {loaded ? (
          <LoadedView reviews={reviews} service={fullService} hours={hours} />
        ) : (
          <LoadingView />
        )}
      </>
    </SafeAreaView>
  );
}

function getResources(resource) {
  const resourceNoSpaces = resource.replace(/ /g, '');
  if (resourceNoSpaces == 'Shower') {
    return <ResourceView color={colors.logoBlue} text='Shower' icon={icons.shower}></ResourceView>;
  } else if (resourceNoSpaces == 'Bathroom') {
    return (
      <ResourceView color={colors.darkBlue} text='Bathroom' icon={icons.toilet}></ResourceView>
    );
  } else if (resourceNoSpaces == 'Haircuts') {
    return (
      <ResourceView color={colors.greenColor} text='Haircut' icon={icons.scissors}></ResourceView>
    );
  } else if (resourceNoSpaces == 'Gym') {
    return <ResourceView color={colors.darkBlue} text='Gym' icon={icons.dumbbell}></ResourceView>;
  } else if (resourceNoSpaces == 'RecCenter') {
    return (
      <ResourceView
        color={colors.ebony_clay}
        text='Rec Center'
        icon={icons.personRunning}
      ></ResourceView>
    );
  } else if (resourceNoSpaces == 'Pool') {
    return <ResourceView color={colors.darkBlue} text='Pool' icon={icons.swimmer}></ResourceView>;
  } else if (resourceNoSpaces == 'Nonprofit') {
    return (
      <ResourceView color={colors.greenColor} text='Non-Profit' icon={icons.smiley}></ResourceView>
    );
  } else if (resourceNoSpaces == 'Park') {
    return <ResourceView color={colors.greenColor} text='Park' icon={icons.tree}></ResourceView>;
  } else if (resourceNoSpaces == 'Laundry') {
    return (
      <ResourceView color={colors.darkBlue} text='Laundry' icon={icons.sparkles}></ResourceView>
    );
  } else if (resourceNoSpaces == 'Clothing') {
    return (
      <ResourceView color={colors.ebony_clay} text='Clothing' icon={icons.shirt}></ResourceView>
    );
  } else if (resourceNoSpaces == 'Hygiene') {
    return (
      <ResourceView color={colors.logoBlue} text='Hygiene' icon={icons.sparkles}></ResourceView>
    );
  }
}

const LoadingView = () => {
  return (
    <Center w='100%'>
      <VStack
        w='100%'
        h='100%'
        maxW='400'
        borderWidth='1'
        space={8}
        overflow='hidden'
        rounded='md'
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}
      >
        <Skeleton h='40' />
        <Skeleton.Text px='4' />
        <Skeleton px='4' my='4' rounded='md' startColor='primary.100' />
      </VStack>
    </Center>
  );
};

const ButtonView = ({ color, icon, text, onPress }) => {
  return (
    <VStack>
      <Button
        style={{
          backgroundColor: color,
          height: 60,
          width: 60,
          borderRadius: 60 / 2,
          alignItems: 'center',
        }}
        onPress={onPress}
      >
        <FontAwesomeIcon icon={icon} size={50} color={colors.white} transform='shrink-5 ' />
      </Button>
      <Text
        style={{
          width: '100%',
          color: colors.black,
          fontFamily: fontNames.Poppins_Regular,
          fontSize: 14,
          paddingVertical: 3,
          textAlign: 'center',
        }}
      >
        {text}
      </Text>
    </VStack>
  );
};

const ResourceView = ({ color, icon, text }) => {
  return (
    <VStack>
      <View
        style={{
          backgroundColor: color,
          height: 65,
          width: 95,
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        <FontAwesomeIcon icon={icon} size={60} color={colors.white} transform='shrink-5 down-1' />
      </View>
      <Text
        style={{
          width: '100%',
          color: colors.black,
          fontFamily: fontNames.Poppins_Regular,
          fontSize: 14,
          paddingVertical: 3,
          textAlign: 'center',
        }}
      >
        {text}
      </Text>
    </VStack>
  );
};

const LoadedView = ({ service, hours, reviews }) => {
  var emptyNotes = false;

  if (service.notes == '') {
    emptyNotes = true;
  } else {
    emptyNotes = false;
  }
  var reviewNumber = 0;
  var reviewTitle = 'No Reviews';

  if (reviews == 'None') {
  } else {
    reviewNumber = reviews['Overall Rating'];
    reviewTitle = reviews['Overall Rating'];
  }

  const resources = service.serviceDetails.split(',');
  console.log(resources);
  const navigation = useNavigation();
  return (
    <ScrollView backgroundColor={colors.darkBlue}>
      <Image
        source={{
          uri: `data:image/jpeg;base64,${service.image}`,
        }}
        style={{ height: 200, width: '100%' }}
        resizeMode='cover'
      />

      <VStack alignItems={'center'}>
        <Text
          style={{
            width: '90%',
            color: colors.white,
            fontFamily: fontNames.Poppins_Bold,
            fontSize: 16,
            paddingTop: 3,
            paddingLeft: 3,
          }}
        >
          Info
        </Text>
        <View
          style={{
            backgroundColor: colors.white,
            height: 278,
            width: '90%',
            borderRadius: 15,
          }}
        >
          <VStack padding={2}>
            <Text
              style={{
                width: '90%',
                color: colors.black,
                fontFamily: fontNames.Poppins_Bold,
                fontSize: 16,
                paddingVertical: 3,
                paddingLeft: 3,
              }}
            >
              {service.name}
            </Text>
            <Text
              style={{
                width: '90%',
                color: colors.black,
                fontFamily: fontNames.Poppins_Light,
                fontSize: 16,
                paddingVertical: 3,
                paddingLeft: 3,
              }}
              numberOfLines={1}
            >
              {service.address}
            </Text>
            <HStack>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: fontNames.Poppins_Regular,
                  fontSize: 16,
                  paddingVertical: 3,
                  paddingLeft: 3,
                }}
                numberOfLines={1}
              >
                {service.isVerified ? 'Verified' : 'Not Verified'}
              </Text>
              <>
                {service.isVerified ? (
                  <FontAwesomeIcon
                    icon={icons.circleCheck}
                    size={30}
                    color={colors.greenColor}
                    transform='shrink-5'
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={icons.circleX}
                    size={30}
                    color={colors.redColor}
                    transform='shrink-5'
                  />
                )}
              </>
            </HStack>
            <HStack space={1}>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: fontNames.Poppins_Light,
                  fontSize: 16,
                  paddingVertical: 3,
                  paddingLeft: 3,
                }}
                numberOfLines={1}
              >
                Rating:
              </Text>
              <StarRating
                style={{ paddingTop: 4 }}
                starStyle={{ marginHorizontal: 0 }}
                rating={reviewNumber}
                maxStars={5}
                color={colors.starYellow}
                starSize={20}
              />
              <Text
                style={{
                  color: colors.black,
                  fontFamily: fontNames.Poppins_Regular,
                  fontSize: 16,
                  paddingVertical: 3,
                  paddingLeft: 3,
                }}
                numberOfLines={1}
              >
                {reviewTitle}
              </Text>
            </HStack>
            <HStack>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: fontNames.Poppins_Light,
                  fontSize: 16,
                  paddingVertical: 3,
                  paddingLeft: 3,
                  paddingRight: 3,
                }}
                numberOfLines={1}
              >
                Hours:
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: fontNames.Poppins_Regular,
                  fontSize: 16,
                  paddingVertical: 3,
                  paddingLeft: 3,
                }}
                numberOfLines={1}
              >
                {hours ? hours : 'No Hours Available'}
              </Text>
            </HStack>
            <HStack style={{ alignSelf: 'center', width: '90%', paddingTop: 10 }}>
              <ButtonView
                color={colors.greenColor}
                icon={icons.phone}
                text={'Call'}
                onPress={() => {
                  console.log('Call');
                  Linking.openURL(`tel:${service.phoneNumber}`);
                }}
              ></ButtonView>
              <Spacer></Spacer>
              <ButtonView
                color={colors.yellowColors}
                icon={icons.star}
                text={'Reviews'}
                onPress={() => {
                  console.log('Reviews');
                  navigation.navigate('Reviews'),
                    {
                      serviceName: service.name,
                    };
                }}
              ></ButtonView>
              <Spacer></Spacer>

              <ButtonView
                color={colors.redColor}
                icon={icons.globe}
                text={'Website'}
                onPress={() => {
                  console.log('Website');
                  Linking.openURL(service.website).catch((err) =>
                    console.error("Couldn't load page", err)
                  );
                }}
              ></ButtonView>
              <Spacer></Spacer>

              <ButtonView
                color={colors.darkBlue}
                icon={icons.compass}
                text={'Directions'}
                onPress={() => {
                  console.log('Directions');
                  Linking.openURL('geo:0,0?q=' + service.address);
                }}
              ></ButtonView>
            </HStack>
          </VStack>
        </View>
        <Text
          style={{
            width: '90%',
            color: colors.white,
            fontFamily: fontNames.Poppins_Bold,
            fontSize: 16,
            paddingTop: 3,
            paddingLeft: 3,
          }}
        >
          Resources and Services
        </Text>
        <View
          style={{
            backgroundColor: colors.white,
            height: 110,
            width: '90%',
            borderRadius: 15,
          }}
        >
          <ScrollView style={{ direction: 'ltr' }}>
            <HStack paddingLeft={5} paddingTop={2} height={110} alignItems={'center'} space={5}>
              {resources[0] ? getResources(resources[0]) : <View></View>}
              {resources[1] ? getResources(resources[1]) : <View></View>}
              {resources[2] ? getResources(resources[2]) : <View></View>}
            </HStack>
          </ScrollView>
        </View>
        <Text
          style={{
            width: '90%',
            color: colors.white,
            fontFamily: fontNames.Poppins_Bold,
            fontSize: 16,
            paddingTop: 3,
            paddingLeft: 3,
          }}
        >
          Notes
        </Text>
        <Text
          style={{
            color: colors.black,
            fontFamily: fontNames.Poppins_Light,
            fontSize: 16,
            backgroundColor: colors.white,
            minHeight: 100,
            width: '90%',
            borderRadius: 15,
            padding: 7,
          }}
        >
          {emptyNotes ? 'No Notes for this Location. ' : service.notes}
        </Text>
      </VStack>
      <View style={{ height: 20 }}></View>
    </ScrollView>
  );
};
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
