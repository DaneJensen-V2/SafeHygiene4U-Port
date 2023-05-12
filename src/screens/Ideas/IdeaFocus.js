/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, useWindowDimensions } from 'react-native';
import { VStack, HStack, Button, Icon, ScrollView, Divider, Spacer } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
import { colors, fontNames, icons } from '../../utils/ui-constants';

// Main Idea Screen that lists ideas in a flatlist. Users can select an idea or
// create a new idea from this screen.

export default function IdeaFocus() {
  const route = useRoute();
  const item = route.params;
  const [content, setContent] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    console.log(`Loading Idea ${item._id}`);
    console.log(`Description:${item.description}`);
    if (typeof item.description !== 'undefined' && item.description != null) {
      setContent(item.description);
    } else {
      setContent('No Content to display.');
    }
  }, []);

  const tagsStyles = {
    body: {
      backgroundColor: 'white',
      fontSize: '1.1rem',
    },
  };

  const editIdea = (idea) => {
    console.log('Test');
  };

  const { width } = useWindowDimensions();

  return (
    <ScrollView backgroundColor={colors.background_color}>
      <View style={styles.container}>
        <HStack>
          <Text style={styles.mainHeading}>{item.title}</Text>
          <Spacer />
          <Button
            leftIcon={
              <Icon
                as={
                  <FontAwesomeIcon
                    icon={icons.pen}
                    size={30}
                    color={colors.ebony_clay}
                    transform='shrink-2'
                  />
                }
              />
            }
            backgroundColor='transparent'
            marginRight={2}
            height={9}
            width={9}
            onPress={() => navigation.navigate('Edit Idea', item)}
          />
        </HStack>
        <Text style={styles.ideaLabel}>Jan 23, 2023</Text>
        <View style={styles.richTextEditorStyle}>
          <RenderHTML contentWidth={width} tagsStyles={tagsStyles} source={{ html: content }} />
        </View>
        <View height={20} />

        <Text style={styles.ideaLabel}>Content Settings</Text>
        <View style={styles.contentSettings}>
          <VStack>
            <HStack>
              <Text style={styles.contentSetting}>Content Type: </Text>
              <Spacer />
              <Text style={styles.ideaText}>Blog Post</Text>
            </HStack>
            <Divider style={styles.divider} />
            <HStack>
              <Text style={styles.contentSetting}>Lead Generation Asset: </Text>
              <Spacer />
              <Text style={styles.ideaText}>{item.isLead ? 'Yes' : 'No'}</Text>
            </HStack>
            <Divider style={styles.divider} />
            <HStack>
              <Text style={styles.contentSetting}>Status: </Text>
              <Spacer />
              <Text style={styles.ideaText}>{item.status}</Text>
            </HStack>
          </VStack>
        </View>
        <View height={20} />
        <HStack justifyContent='center' space={16}>
          <Button
            backgroundColor={colors.redColor}
            rounded='xl'
            shadow='4'
            variant='solid'
            marginBottom={2}
            marginTop={2}
            height={50}
            width={125}
          >
            <Text style={styles.heading}>Reject</Text>
          </Button>
          <Button
            backgroundColor={colors.robin_egg_blue}
            rounded='xl'
            shadow='4'
            variant='solid'
            marginBottom={2}
            marginTop={2}
            height={50}
            width={125}
          >
            <Text style={styles.heading}>Approve</Text>
          </Button>
        </HStack>
        <View height={30} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background_color,
  },
  divider: {
    marginVertical: 15,
  },

  mainHeading: {
    fontFamily: fontNames.Poppins_Bold,
    color: colors.ebony_clay,
    fontSize: 23,
  },
  contentSettings: {
    height: 165,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  heading: {
    fontFamily: fontNames.Poppins_Bold,
    color: colors.white,
    fontSize: 16,
  },
  ideaLabel: {
    fontFamily: fontNames.Poppins_Light,
    color: colors.light_gray,
    fontSize: 18,
    marginTop: 0,
    marginBottom: 5,
  },
  ideaText: {
    fontFamily: fontNames.Poppins_Regular,
    color: colors.ebony_clay,
    fontSize: 16,
    alignSelf: 'center',
  },
  contentSetting: {
    fontFamily: fontNames.Poppins_SemiBold,
    color: colors.ebony_clay,
    fontSize: 16,
    alignSelf: 'center',
  },
  richTextEditorStyle: {
    borderWidth: 5,
    borderRadius: 10,
    padding: 10,
    minHeight: 525,
    borderColor: colors.white,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  subHeading: {
    fontFamily: fontNames.Poppins_SemiBold,
    color: colors.pickled_bluewood,
    fontSize: 18,
    marginTop: 15,
    marginBottom: 5,
  },
});
