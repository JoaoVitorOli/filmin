import React from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';

interface ButtonProps {
  onRequestClose: () => void;
}

export function ButtonClose({ onRequestClose }: ButtonProps) {
  return (
    <TouchableHighlight
      onPress={onRequestClose}
      underlayColor="#dddddd10"
      style={styles.button}
    >
      <Icon 
        name="close"
        size={20}
        color={"#d2d2d2"}
      />
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 6,
    marginLeft: "auto"
  }
})
