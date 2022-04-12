import React from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from "react-native-linear-gradient";

interface ButtonAddMovieProps {
  handleOpenModal: () => void;
}

export function ButtonAddMovie({
  handleOpenModal
}: ButtonAddMovieProps) {
  return (
    <TouchableOpacity 
      onPress={() => handleOpenModal()} 
      style={styles.button}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['#4124C3', '#B144D4']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{ 
          height: 47, 
          width: 47, 
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 12
        }}
      >
        <Icon 
          name="plus"
          size={30}
          color={"#fff"}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12
  }
})
