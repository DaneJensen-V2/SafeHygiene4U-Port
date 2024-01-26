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
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, HStack, VStack, Icon, Input, Spacer } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import MapView, { Marker } from 'react-native-maps';
import StarRating from 'react-native-star-rating-widget';
import { colors, fontNames, icons } from '../../utils/ui-constants';
import { collection, doc, getDoc, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { UserData } from '../../context/userData';
import { useAuthentication } from '../../context/useAuthentication';
import { getAuth } from 'firebase/auth';

// Details screen, just an extra screen to demo pushing and popping screens from a stack
export default function Reviews() {
  const route = useRoute();
  const navigation = useNavigation();
  const [Reviews, setReviews] = useState();
  const [search, setSearch] = useState('');
  const { serviceName } = route.params;
  const [isLoading, setisLoading] = useState(true);
  const { user } = useAuthentication();
  const auth = getAuth();
  const userData = UserData();

  var DATA = [];
  const getData = async () => {
    setisLoading(true);

    await getReviews();

    setisLoading(false);
    console.log('Got Data');
  };

  const getReviews = async () => {
    var result = [];
    console.log(serviceName);

    const docRef = doc(db, 'Reviews', serviceName);

    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.data());
          DATA = snapshot.data().allReviews;
          console.log('DATA: ' + DATA[0].date);
          setReviews(DATA);
        } else {
          console.log('No data available');
        }
      }, [])
      .catch((error) => {
        console.error(error);
      });
  };

  //  console.log('RESULT' + result);

  useEffect(() => {
    getData();
  }, []);

  function addReview() {
    console.log('Add Review');
    navigation.navigate('Add Review', {
      serviceName: serviceName,
    });
  }

  function ListItem(item) {
    return (
        <View style={styles.item}>
          <HStack space={3}>
            <FontAwesomeIcon icon={icons.circleUser} size={65} color={colors.black} />

            <VStack space={0}>
              <Text numberOfLines={1} style={styles.itemHeading}>
                {item.user}
              </Text>
              <Text numberOfLines={1} style={styles.header}>
                {item.date}
              </Text>
            </VStack>
          </HStack>
          <View style={{ height: 5 }} />
          <StarRating
            style={{ paddingTop: 3, paddingLeft: 5 }}
            starStyle={{ marginHorizontal: 0 }}
            rating={item.rating}
            maxStars={5}
            color={colors.starYellow}
            starSize={25}
            onChange={() => {
              console.log('Test');
            }}
            animationConfig={{ duration: 0, scale: 1 }}
          />
          <Text style={styles.content}>{item.content}</Text>
        </View>
    );
  }

  return (
    <View style={{ backgroundColor: colors.white, flex: 1, padding: 5 }}>
      <FlatList
        style={styles.list}
        data={Reviews}
        keyExtractor={(item, index) => item.user + index}
        renderItem={({ item }) => <ListItem {...item} />}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 1, backgroundColor: colors.light_gray, margin: 5 }} />;
        }}
      />
      <Button
        alignSelf='center'
        height={60}
        width={60}
        borderRadius={30}
        backgroundColor={colors.darkBlue}
        marginBottom={10}
        onPress={addReview}
        startIcon={
          <Icon as={<FontAwesomeIcon icon={icons.plus} size={25} color={colors.white} />} />
        }
      ></Button>
    </View>
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
    fontSize: 16,
    backgroundColor: '#fff',
    color: colors.black,
    fontFamily: fontNames.Poppins_Light,
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
