/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {
  VStack,
  HStack,
  Button,
  Icon,
  CheckIcon,
  Switch,
  Center,
  ScrollView,
  Divider,
  Spacer,
} from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { colors, fontNames, icons } from '../../utils/ui-constants';
import { textStyles } from '../../styles/Styles';
import { useRoute } from '@react-navigation/native';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import MainButton from '../../components/buttons/main-button';
import RenderHTML from 'react-native-render-html';

// Main Idea Screen that lists ideas in a flatlist. Users can select an idea or
// create a new idea from this screen.

export default function IdeaFocus() {
  const route = useRoute();
  const { title } = route.params;
  const { ID } = route.params;
  const richText = useRef();

  const tempInitialContent =
    '<div><b>Here is my idea:&nbsp;</b></div><div><ul><li>We make an app</li><li>Post it to the App Store</li><li><i>Profit</i></li></ul><div><i></i></div></div><div><b>Here is my idea:&nbsp;</b></div><div><ul><li>We make an app</li><li>Post it to the App Store</li><li><i>Profit</i></li></ul><div><i></i></div></div>';

  useEffect(() => {
    console.log('Loading Idea ' + ID);
  }, []);

  const setText = () => {
    console.log('Setting Text');
  };

  return (
    <ScrollView backgroundColor={colors.background_color}>
      <View style={styles.container}>
        <HStack>
          <Text style={styles.mainHeading}>{title}</Text>
          <Spacer></Spacer>
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
            backgroundColor={'transparent'}
            marginRight={2}
            height={9}
            width={9}
          />
        </HStack>
        <Text style={styles.ideaLabel}>Jan 23, 2023</Text>
        <RichEditor
          ref={richText}
          androidHardwareAccelerationDisabled={true}
          style={styles.richTextEditorStyle}
          initialHeight={525}
          autoCapitalize={true}
          autoCorrect={true}
          //Can't get this to not be focused initially for some reason.
          initialFocus={false}
          initialContentHTML={tempInitialContent}
          disabled={true}
        />
        <View height={20} />
        <View style={styles.richTextEditorStyle}>
          <RenderHTML contentWidth={150} back source={{ html: tempInitialContent }} />
        </View>

        <Text style={styles.ideaLabel}>Content Settings</Text>
        <View style={styles.contentSettings}>
          <VStack>
            <HStack>
              <Text style={styles.contentSetting}>Content Type: </Text>
              <Spacer></Spacer>
              <Text style={styles.ideaText}>Blog Post</Text>
            </HStack>
            <Divider style={styles.divider}></Divider>
            <HStack>
              <Text style={styles.contentSetting}>Lead Generation Asset: </Text>
              <Spacer></Spacer>
              <Text style={styles.ideaText}>No</Text>
            </HStack>
            <Divider style={styles.divider}></Divider>
            <HStack>
              <Text style={styles.contentSetting}>Status: </Text>
              <Spacer></Spacer>
              <Text style={styles.ideaText}>Hidden</Text>
            </HStack>
          </VStack>
        </View>
        <View height={20} />
        <HStack justifyContent='center' space={16}>
          <Button
            backgroundColor={colors.brilliant_rose}
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
    fontSize: 24,
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
    borderColor: colors.white,
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
