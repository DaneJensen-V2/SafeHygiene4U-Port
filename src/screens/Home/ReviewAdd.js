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
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, HStack, VStack, Icon, Input, Spacer, TextArea } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import MapView, { Marker } from 'react-native-maps';
import StarRating from 'react-native-star-rating-widget';
import { colors, fontNames, icons } from '../../utils/ui-constants';
import { collection, doc, getDoc, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../firebase-config';

// Details screen, just an extra screen to demo pushing and popping screens from a stack
export default function ReviewAdd() {
  const route = useRoute();

  const { serviceName } = route.params;
  const [rating, setRating] = useState(0);

  //  console.log('RESULT' + result);

  function addReview() {
    console.log('Add Review');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ backgroundColor: colors.white, flex: 1, padding: 15 }}>
        <Text style={styles.heading}>{serviceName}</Text>
        <HStack>
          <StarRating
            starStyle={{ marginHorizontal: 0 }}
            rating={rating}
            onChange={setRating}
            maxStars={5}
            color={colors.starYellow}
            starSize={40}
            animationConfig={{ duration: 0, scale: 1 }}
            enableHalfStar={false}
          />
          <Text style={styles.header}>Select your rating.</Text>
        </HStack>
        <View style={{ height: 15 }}></View>
        <TextArea alignSelf='center' h={300} placeholder='Write your review here...' w='100%' />
        <View style={{ height: 15 }}></View>

        <Button
          h={39}
          backgroundColor={colors.darkBlue}
          _text={{
            fontFamily: fontNames.Poppins_Regular,
            fontSize: 14,
            textAlign: 'center',
          }}
          rightIcon={
            <Icon
              as={
                <FontAwesomeIcon
                  icon={icons.check}
                  size={20}
                  color={colors.white}
                  transform='shrink-5'
                />
              }
            />
          }
        >
          Submit Review
        </Button>
      </View>
    </TouchableWithoutFeedback>
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
    fontSize: 24,
    paddingLeft: 5,
  },
  itemHeading: {
    fontFamily: fontNames.Poppins_SemiBold,
    color: colors.black,
    fontSize: 20,
  },
  distanceText: {
    fontFamily: fontNames.Poppins_Light,
    color: colors.light_gray,
    fontSize: 17,
  },
  item: {
    marginVertical: 4,
    justifyContent: 'center',
  },
  header: {
    fontSize: 14,
    backgroundColor: '#fff',
    color: colors.black,
    fontFamily: fontNames.Poppins_Light,
    paddingTop: 10,
    paddingLeft: 4,
    alignSelf: 'center',
  },
  content: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fontNames.Poppins_Regular,
    padding: 5,
  },
  title: {
    fontSize: 24,
  },
  list: {
    padding: 10,
  },
});
