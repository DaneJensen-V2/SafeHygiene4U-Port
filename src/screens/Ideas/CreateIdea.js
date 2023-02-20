import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {
  HStack,
  Input,
  TextArea,
  Select,
  CheckIcon,
  Switch,
  Center,
  ScrollView,
} from 'native-base';
import { colors, fontNames } from '../../utils/ui-constants';

import LoadingButton from '../../components/buttons/loading-button';

// Screen for creating an idea. Lets user type in a title, content, content type,
// and save the idea to their account.

export default function CreateIdea() {
  const [contentType, setContentType] = useState('');
  const [isLeadGenerationAsset, setLeadAsset] = useState(false);
  const [isSuggestedIdea, setSuggestedIdea] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const SaveIdea = () => {
    setLoading(true);
  };

  return (
    <ScrollView backgroundColor={colors.background_color}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.mainHeading}>New Idea</Text>
          <Text style={styles.subHeading}>Title</Text>
          <Input size='md' defaultValue='[234324] New Idea' placeholder='Enter title...'>
            {' '}
          </Input>
          <Text style={styles.subHeading}>Content</Text>
          <TextArea size='md' placeholder='Type your idea here...' h='250 ' />
          <Text style={styles.subHeading}>Content Type</Text>
          <Select
            selectedValue={contentType}
            size='md'
            minWidth='200'
            accessibilityLabel='Choose Service'
            placeholder='Select Content Type'
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size='5' />,
            }}
            mt={1}
            onValueChange={(itemValue) => setContentType(itemValue)}
          >
            <Select.Item label='Social Post' value='sp' />
            <Select.Item label='Blog Post' value='blog' />
            <Select.Item label='Twitter Post' value='twitter' />
            <Select.Item label='Facebook Post' value='facebook' />
            <Select.Item label='LinkedIn Post' value='linkedin' />
            <Select.Item label='Instagram Post' value='instagram' />
            <Select.Item label='Youtube Post' value='youtube' />
            <Select.Item label='Internal Document' value='document' />
            <Select.Item label='Slideshare' value='slideshare' />
          </Select>
          <View height={40} />

          <HStack alignItems='center' paddingLeft={1} space={4}>
            <Text style={styles.ideaText}>Lead generation asset</Text>
            <Switch
              size='md'
              value={isLeadGenerationAsset}
              onValueChange={(val) => setLeadAsset(val)}
            />
          </HStack>
          <View height={40} />

          <HStack alignItems='center' paddingLeft={1} space={4}>
            <Text style={styles.ideaText}>Would you like to suggest this idea?</Text>
            <Switch
              size='md'
              value={isSuggestedIdea}
              onValueChange={(val) => setSuggestedIdea(val)}
            />
          </HStack>
          <View height={40} />
          <Center>
            <LoadingButton
              text='Save'
              bgColor={colors.robin_egg_blue}
              onPress={SaveIdea}
              isLoading={isLoading}
              loadingText='Saving'
            />
          </Center>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
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
    width: '83%',
    alignSelf: 'center',
  },
  subHeading: {
    fontFamily: fontNames.Poppins_Light,
    color: colors.light_gray,
    fontSize: 18,
    marginTop: 15,
    marginBottom: 5,
  },
});
