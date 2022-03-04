import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from "react-native-linear-gradient";
import MaskedView from '@react-native-community/masked-view';

interface GradientTextProps {
  text: string;
}

export function TextGradient({ text }: GradientTextProps) {
  return (
    <MaskedView
      style={{ height: 19, width: 50 }}
      maskElement={
        <Text style={styles.text}>
          {text}
        </Text>
      }
    >
      <LinearGradient
        colors={['#4124C3', '#B144D4']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{ height: "100%", width: "100%" }}
      />
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "nunito_bold",
    fontSize: 16,
    marginHorizontal: 3.5
  }
})
