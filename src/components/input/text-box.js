import React from "react";
import { Input, Icon, Box, Pressable } from "native-base";
//import  {MaterialIcons} from "@expo/vector-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { colors } from "../../utils/ui-constants";

const TextBox = () => {
    return <Box alignItems="center">
        <Input w={{base: "75%",md: "25%"}} 
        InputLeftElement={<Icon as={<FontAwesomeIcon icon="fa-regular fa-envelope" size={30} color = {colors.light_gray} ml = "10"/>} marginLeft = {5} style={{width: 5}} />}
         placeholder="Email" 
         isFullWidth = {true}
         h={{base: "33%"}} />
    </Box>;
    };
 


  export default TextBox;
