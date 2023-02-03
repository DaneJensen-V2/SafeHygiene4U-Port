import React from "react";
import {Text,StyleSheet, View, ScrollView} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { colors, fontNames, icons } from "../../utils/ui-constants";
import { Button, HStack, VStack, Icon, Center } from "native-base";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

//Details screen, just an extra screen to demo pushing and popping screens from a stack
export const HomeScreen = () =>{

  const navigation= useNavigation();

    return (
        <ScrollView>
          <View style={styles.container}>
              <Text style={styles.mainHeading}>
                Dashboard
              </Text>
              <Text style={styles.subHeading}>
                My Tasks
              </Text>

              <MyTasksView>
              </MyTasksView>

              <Text style={styles.subHeading}>
                Create
              </Text>

              <CreateView navigation = {navigation}>
              </CreateView>

          </View>
        </ScrollView>
      ); 
  }

  function MyTasksView() {

    return (
        <View style={styles.taskView}>
            <VStack space={1.5}>
              <TaskSection bgColor={colors.brilliant_rose} text="Overdue" value="0" taskIcon={icons.triangle}> </TaskSection>
              <TaskSection bgColor={colors.medium_purple} text="To Do" value="0" taskIcon={icons.clock}> </TaskSection>
              <TaskSection bgColor={colors.cerulean} text="Proposed Ideas" value="0" taskIcon={icons.lightning}> </TaskSection>
            </VStack>
        </View>
    );
};
``


function TaskSection({bgColor, text, value, taskIcon}){
  return (
         <HStack height={75} padding={5}>
              <View style={{height: 50, width: 50, backgroundColor: bgColor, alignSelf : 'center', marginRight : 10, borderRadius: 10}}> 
                <Center paddingTop={2}>
                <Icon as={<FontAwesomeIcon icon={taskIcon} size={30} color={colors.white}/>}/>
                </Center>
              </View>
              <Text style={styles.taskHeading}>
                {text}
              </Text>
              <Text style={styles.taskHeading2}>
                {value}
              </Text>
         </HStack>
   
);
}

const CreateView = ({navigation}) => {

  return (
      <View style={styles.createView}>
          <VStack >
            <Button  height={150} paddingBottom={0} onPress={() => navigation.navigate('IdeaMain')} style = {styles.buttonStyle} m="4" borderRadius={15} backgroundColor="#F0E7FB" opacity = {1} _text={{
              color: colors.medium_purple, 
              fontFamily : fontNames.Poppins_Regular,
              fontSize: 18, 
              textAlign : 'center'
            }}
              >
                <Center >
                <Icon as={<FontAwesomeIcon icon={icons.lightbulb} size={30} color={colors.medium_purple}/>}/>
                </Center>
            Idea
              
            </Button>
            <Button  height={150} onPress={() => navigation.navigate('SocialPost')} mx="4" borderRadius={15} backgroundColor="#D9F5FE" opacity = {1} _text={{
              color: colors.cerulean, 
              fontFamily : fontNames.Poppins_Regular,
              fontSize: 18
            }}
              >
                <Center >
                <Icon as={<FontAwesomeIcon icon={icons.shareNodes} size={30} color={colors.cerulean}/>}/>
                </Center>
            Social Post
            </Button>
            <Button  height={150} onPress={() => navigation.navigate('BlogPost')} m="4" borderRadius={15} backgroundColor="#FFEBE8" opacity = {1} _text={{
              color: "#FC4D3D",
              fontFamily : fontNames.Poppins_Regular,
              fontSize: 18
            }}
              >
                 <Center >
                     <Icon as={<FontAwesomeIcon icon={icons.rectangleList} size={30} color="#FC4D3D"/>}/>
                </Center>
            Blog Post
            </Button>
          </VStack>
      </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      height: 1050,
      backgroundColor : colors.background_color
    },
    mainHeading: {
      fontFamily: fontNames.Poppins_Bold,
      color: colors.ebony_clay,
      fontSize : 28
    },
    subHeading: {
      fontFamily: fontNames.Poppins_Light,
      color: colors.pickled_bluewood,
      fontSize : 18,
      marginTop : 15,      
      marginBottom : 15

    },
    taskView: {
      height: 245,
      backgroundColor: colors.white,
      borderRadius : 10
    }, 
    taskHeading: {
      fontFamily: fontNames.Poppins_Regular,
      color: colors.light_gray,
      fontSize : 20,
      alignSelf: 'center',
      width: 155
    },
    taskHeading2: {
      fontFamily: fontNames.Poppins_Regular,
      color: colors.ebony_clay,
      fontSize : 30,
      alignSelf : 'center',
      textAlign: 'right',
      width: 100
    },
    createView: {
      height: 520,
      backgroundColor: colors.white,
      borderRadius : 10
    }, 
  });
  



