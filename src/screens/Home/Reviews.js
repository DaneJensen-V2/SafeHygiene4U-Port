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
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, HStack, VStack, Icon, Input, Spacer } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import MapView, { Marker } from 'react-native-maps';
import StarRating from 'react-native-star-rating-widget';
import { colors, fontNames, icons } from '../../utils/ui-constants';
import { collection, doc, getDoc, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../firebase-config';

// Details screen, just an extra screen to demo pushing and popping screens from a stack
export default function Reviews() {
  const route = useRoute();
  const [Reviews, setReviews] = useState();
  const [search, setSearch] = useState('');
  const { serviceName } = route.params;
  const [isLoading, setisLoading] = useState(true);

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
          DATA = result;
          console.log('DATA: ' + DATA);
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

  function ListItem(item) {
    //console.log('LIST ITEMS: ' + Services[0].data);
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
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <FlatList
        style={styles.list}
        data={Services}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <ListItem {...item} />}
      />
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
    padding: 10,
  },
});
