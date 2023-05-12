import React, { useState, useRef } from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback, Pressable } from 'react-native';
import { HStack, Input, Select, CheckIcon, Switch, Center, ScrollView } from 'native-base';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import moment from 'moment';
import { useRoute } from '@react-navigation/native';
import { colors, fontNames } from '../../utils/ui-constants';
import LoadingButton from '../../components/buttons/loading-button';
// Screen for creating an idea. Lets user type in a title, content, content type,
// and save the idea to their account.

export default function EditIdea() {
  const [contentType, setContentType] = useState('');
  const [isLeadGenerationAsset, setLeadAsset] = useState(false);
  const [isSuggestedIdea, setSuggestedIdea] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const route = useRoute();
  const item = route.params;

  const richText = useRef();
  const [descHTML, setDescHTML] = useState('');
  const [showDescError, setShowDescError] = useState(false);

  const currentDate = moment().format('YYYYMMDD');

  const richTextHandle = (descriptionText) => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
      console.log(descHTML);
    } else {
      setShowDescError(true);
      setDescHTML('');
    }
  };

  const SaveIdea = () => {
    setLoading(true);
  };

  const dismissKeyboards = () => {
    //    richText.current?.dismissKeyboard();
    //   Keyboard.dismiss;
  };

  return (
    <ScrollView backgroundColor={colors.background_color} keyboardShouldPersistTaps='never'>
      <TouchableWithoutFeedback onPress={dismissKeyboards} accessible={false}>
        <View style={styles.container}>
          <Pressable onPress={() => richText.current?.dismissKeyboard()}>
            <Text style={styles.mainHeading}>{item.title}</Text>
            <Text style={styles.subHeading}>Title</Text>
            <Input
              backgroundColor={colors.white}
              size='md'
              defaultValue={item.title}
              placeholder='Enter title...'
            >
              {' '}
            </Input>
            <Text style={styles.subHeading}>Content</Text>
          </Pressable>
          <View style={styles.richTextContainer}>
            <RichEditor
              ref={richText}
              onChange={richTextHandle}
              initialContentHTML={item.description}
              placeholder='Write your idea here...'
              androidHardwareAccelerationDisabled
              style={styles.richTextEditorStyle}
              initialHeight={250}
              autoCapitalize
              autoCorrect
              // Can't get this to not be focused initially for some reason.
              initialFocus={false}
            />
            <RichToolbar
              editor={richText}
              selectedIconTint='#873c1e'
              iconTint='#312921'
              actions={[
                actions.setBold,
                actions.setItalic,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.insertLink,
                actions.setStrikethrough,
                actions.setUnderline,
              ]}
              style={styles.richTextToolbarStyle}
            />
          </View>
          <Text style={styles.subHeading}>Content Type</Text>
          <Select
            backgroundColor={colors.white}
            selectedValue={contentType}
            size='md'
            minWidth='200'
            accessibilityLabel='Choose Service'
            placeholder='Select Content Type'
            
            _selectedItem={{
              bg: colors.robin_egg_blue,
              endIcon: <CheckIcon size='5' />,
              borderRadius: 'md',
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
          <View height={30} />

          <HStack alignItems='center' paddingLeft={1} space={4}>
            <Text style={styles.ideaText}>Lead generation asset</Text>
            <Switch
              size='md'
              value={isLeadGenerationAsset}
              defaultIsChecked={item.isLead}
              onValueChange={(val) => setLeadAsset(val)}
              onTrackColor={colors.robin_egg_blue}
            />
          </HStack>
          <View height={20} />

          <HStack alignItems='center' paddingLeft={1} space={4}>
            <Text style={styles.ideaText}>Would you like to suggest this idea?</Text>
            <Switch
              size='md'
              defaultIsChecked={item.status !== 'HIDDEN'}
              value={isSuggestedIdea}
              onValueChange={(val) => setSuggestedIdea(val)}
              onTrackColor={colors.robin_egg_blue}
            />
          </HStack>
          <View height={20} />
          <Center>
            <LoadingButton
              text='Save'
              bgColor={colors.robin_egg_blue}
              onPress={SaveIdea}
              isLoading={isLoading}
              loadingText='Saving'
            />
            <View height={30} />
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
    fontSize: 24,
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

  htmlBoxStyle: {
    height: 200,
    width: 330,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },

  richTextContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    width: '100%',
    marginBottom: 10,
  },

  richTextEditorStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 0,
    borderColor: colors.bright_turquoise,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  richTextToolbarStyle: {
    backgroundColor: colors.bright_turquoise,
    borderColor: colors.bright_turquoise,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
  },
});
