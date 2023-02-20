/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { HStack, Icon, Input, FlatList } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { colors, fontNames, icons } from '../../utils/ui-constants';
import {textStyles} from '../../styles/Styles';

// Main Idea Screen that lists ideas in a flatlist. Users can select an idea or
// create a new idea from this screen.

export default function IdeaMain() {
  // Hardcoded data used for testing
  // TODO: replace with users actual Ideas
  const data = [
    {
      id: '1',
      title: 'New Instagram Idea',
    },
    {
      id: '2',
      title: 'New Youtube Video',
    },
    {
      id: '3',
      title: 'Start Twitter Page',
    },
    {
      id: '4',
      title: 'Post LinkedIn Update',
    },
  ];

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    setMasterDataSource(data);
    setFilteredDataSource(data);
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter((item) => {
        // Applying filter for the inserted text in search bar
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.mainHeading}>Ideas</Text>
        <View height={10} />
        <Input
          style={textStyles.body}
          value={search}
          InputLeftElement={
            <Icon
              as={
                <FontAwesomeIcon
                  icon={icons.search}
                  size={30}
                  color={colors.light_gray}
                  transform='shrink-5 right-2'
                />
              }
            />
          }
          onChangeText={(text) => searchFilterFunction(text)}
          placeholder='Search'
        />
        <View height={20} />
        <IdeaList dataSource={filteredDataSource} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background_color,
  },
  ideaItem: {
    flex: 1,
    padding: 10,
    height: 60,
    backgroundColor: colors.white,
    justifyContent: 'center',
    borderRadius: 5,
  },
  mainHeading: {
    fontFamily: fontNames.Poppins_Bold,
    color: colors.ebony_clay,
    fontSize: 28,
  },
  ideaText: {
    fontFamily: fontNames.Poppins_Regular,
    color: colors.ebony_clay,
    fontSize: 16,
    width: '90%',
    alignSelf: 'center',
  },
});

function IdeaList({ dataSource }) {
  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      style={{ flex: 1 }}
      data={dataSource}
      keyExtractor={(index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            console.log(item.title);
          }}
        >
          <HStack style={styles.ideaItem}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.ideaText}>
              {' '}
              [{item.id}] {item.title}
            </Text>
            <Icon
              as={
                <FontAwesomeIcon
                  icon={icons.rightChevron}
                  size={30}
                  color={colors.light_gray}
                  transform='shrink-5 down-2'
                />
              }
            />
          </HStack>
        </TouchableOpacity>
      )}
    />
  );
}
