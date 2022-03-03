import React from 'react';
import { 
  Image, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from "react-native-linear-gradient";

import { styles } from "./styles";
import { Profile } from './Profile';

export function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.top}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.icon}
          />
          <Text style={styles.textLogo}>FILMIN</Text>

          <Profile />
        </View>
      </View>
    </View>
  )
}
