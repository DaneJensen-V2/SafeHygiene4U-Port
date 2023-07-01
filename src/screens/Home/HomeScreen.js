import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, HStack, VStack, Icon, Spacer, Modal, Checkbox } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import MapView, { Marker } from 'react-native-maps';
import { colors, fontNames, icons } from '../../utils/ui-constants';
import { useServices } from '../../context/ServicesContext';
import { async } from '@firebase/util';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
import * as Location from 'expo-location';
import SideMenu from 'react-native-side-menu';
import Menu from '../../components/menu';

// Details screen, just an extra screen to demo pushing and popping screens from a stack
export function HomeScreen() {
  const [Services, setServcices] = useState([]);
  const [showers, setShowers] = useState([]);
  const [Clothing, setClothing] = useState([]);
  const [nonProfits, setNonProfits] = useState([]);
  const [mapList, setMapList] = useState([]);

  const [location, setLocation] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [showerFilter, setShowerFilter] = useState(true);
  const [clothingFilter, setClothingFilter] = useState(true);
  const [nonProfitFilter, setnonProfitFilter] = useState(true);

  const mapView = React.createRef();

  const getData = async () => {
    var serviceList = [];
    setShowers([]);
    setClothing([]);
    setNonProfits([]);

    console.log('Getting Data');
    const querySnapshot = await getDocs(collection(db, 'Services'));

    querySnapshot.forEach((doc) => {
      let serviceType = doc.data().serviceType;

      if (serviceType == 'Shower') {
        showers.push(doc.data());
      } else if (serviceType == 'Clothing') {
        Clothing.push(doc.data());
      } else {
        nonProfits.push(doc.data());
      }
    });

    serviceList.push(showers);
    serviceList.push(Clothing);
    serviceList.push(nonProfits);
    setServcices(serviceList);
    setMapList(Services);
  };

  useEffect(() => {
    console.log('Use Effect');
    getData();
  }, []);

  const goToMyLocation = () => {
    console.log(location);
    mapView.current.animateCamera({
      center: { latitude: location.coords.latitude, longitude: location.coords.longitude },
      zoom: 15,
    });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        enableHighAccuracy: true,
        timeInterval: 5,
      });
      setLocation(location);
    })();
  }, []);

  const menu = <Menu />;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
        padding: 10,
        paddingTop: Platform.OS === 'android' ? 45 : 0,
      }}
    >
      <SideMenu menu={menu} isOpen={isOpen} onChange={(isOpen) => setIsOpen(isOpen)}>
        <View style={styles.container}>
          <MapView
            ref={mapView}
            provider='google'
            style={styles.mapStyle}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {mapList.map((list, index) => {
              return list.map((val, subindex) => {
                return (
                  <Marker
                    coordinate={{
                      latitude: val.latitude,
                      longitude: val.longitude,
                    }}
                    key={subindex}
                    title={val.name}
                    description={'test'}
                  ></Marker>
                );
              });
            })}
          </MapView>
          <View style={{ height: 60 }} />
          <FilterModal></FilterModal>
          <HeaderStack />
          <Spacer />
          <RadioButton />
          <View style={{ height: 55 }} />
        </View>
      </SideMenu>
    </SafeAreaView>
  );

  function FilterModal() {
    var shower = showerFilter;
    var clothing = clothingFilter;
    var nonProfit = nonProfitFilter;
    var newList = [];

    return (
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth='400px'>
          <Modal.CloseButton />
          <Modal.Header>Map Filters</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <Checkbox
                size='md'
                defaultIsChecked={showerFilter}
                onChange={(value) => {
                  shower = value;
                }}
              >
                Showers
              </Checkbox>
              <Checkbox
                size='md'
                defaultIsChecked={clothingFilter}
                onChange={(value) => {
                  clothing = value;
                }}
              >
                Clothing
              </Checkbox>
              <Checkbox
                size='md'
                defaultIsChecked={nonProfitFilter}
                onChange={(value) => {
                  nonProfit = value;
                }}
              >
                Non-Profit
              </Checkbox>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant='ghost'
                colorScheme='blueGray'
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                  setClothingFilter(clothing);
                  setShowerFilter(shower);
                  setnonProfitFilter(nonProfit);
                  newList = [];
                  if (clothing) {
                    newList.push(Clothing);
                  }
                  if (shower) {
                    newList.push(showers);
                  }
                  if (nonProfit) {
                    newList.push(nonProfits);
                  }
                  setMapList(newList);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  }

  function HeaderStack() {
    return (
      <HStack paddingX={4}>
        <MenuButton />
        <Spacer />
        <HeaderLogo />
        <Spacer />
        <VStack space={5}>
          <LocationButton />
          <FiltersButton />
        </VStack>
      </HStack>
    );
  }
  function MenuButton() {
    return (
      <Button
        leftIcon={
          <Icon
            as={
              <FontAwesomeIcon
                icon={icons.bars}
                size={35}
                color={colors.white}
                transform='shrink-5'
              />
            }
          />
        }
        backgroundColor={colors.logoBlue}
        rounded='full'
        variant='solid'
        marginRight={2}
        height={10}
        width={10}
        testID='main-button'
        onPress={() => setIsOpen(true)}
      />
    );
  }
  function HeaderLogo() {
    return (
      <Image
        source={require('../../../assets/logo-white.png')}
        style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
      />
    );
  }
  function LocationButton() {
    const newLocation = {
      latitude: 2.0469,
      longitude: 45.3182,
    };

    return (
      <Button
        leftIcon={
          <Icon
            as={
              <FontAwesomeIcon
                icon={icons.locationArrow}
                size={35}
                color={colors.white}
                transform='shrink-5'
              />
            }
          />
        }
        backgroundColor={colors.logoBlue}
        rounded='full'
        variant='solid'
        marginRight={2}
        height={10}
        width={10}
        testID='main-button'
        onPress={goToMyLocation}
      />
    );
  }
  function FiltersButton() {
    const navigation = useNavigation();

    return (
      <Button
        leftIcon={
          <Icon
            as={
              <FontAwesomeIcon
                icon={icons.sliders}
                size={30}
                color={colors.white}
                transform='shrink-5'
              />
            }
          />
        }
        backgroundColor={colors.logoBlue}
        rounded='full'
        variant='solid'
        marginRight={2}
        height={10}
        width={10}
        testID='main-button'
        onPress={() => setShowModal(true)}
      />
    );
  }
  function RadioButton() {
    const navigation = useNavigation();

    return (
      <HStack>
        <Button
          backgroundColor={colors.logoBlue}
          width={110}
          height={39}
          borderRightRadius={0}
          borderLeftRadius={10}
          _text={{
            fontFamily: fontNames.Poppins_Regular,
            fontSize: 14,
            textAlign: 'center',
          }}
          leftIcon={
            <Icon
              as={
                <FontAwesomeIcon
                  icon={icons.faMap}
                  size={40}
                  color={colors.white}
                  transform='shrink-5'
                />
              }
            />
          }
        >
          Map
        </Button>
        <Button
          backgroundColor={colors.darkBlue}
          width={110}
          height={39}
          borderLeftRadius={0}
          borderRightRadius={10}
          onPress={() => {
            console.log('You tapped the button!');
            navigation.navigate('Home List', {
              services: Services,
            });
          }}
          _text={{
            fontFamily: fontNames.Poppins_Regular,
            fontSize: 14,
            textAlign: 'center',
            color: colors.light_gray,
          }}
          leftIcon={
            <Icon
              as={
                <FontAwesomeIcon
                  icon={icons.list}
                  size={30}
                  color={colors.light_gray}
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
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  markerImage: {
    width: 25,
    height: 25,
  },
});
