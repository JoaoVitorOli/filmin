import React from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from "react-native-linear-gradient";

export function Profile() {
  return (
    <TouchableOpacity 
      onPress={() => {}} 
      style={styles.buttonProfile}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['#4124C3', '#B144D4']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{ 
          height: 47, 
          width: 47, 
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Icon 
          name="person-outline"
          size={25}
          color={"#fff"}
        /> 
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonProfile: {
    marginLeft: "auto"
  }
})
