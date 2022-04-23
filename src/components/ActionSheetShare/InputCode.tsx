import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { theme } from "../../styles/theme";

interface InputCodeProps {
  setText: (value: string) => void;
  value: string;
}

export function InputCode({ setText, value }: InputCodeProps) {
  const [isInputFocused, setIsInputFocused] = useState(false);

  function verifyIfInputIsFocused() {
    if (isInputFocused) {
      return styles.inputFocused;
    } else {
      return null;
    }
  }

  return (
    <TextInput
      placeholder="Cole o código aqui."
      style={[styles.input, verifyIfInputIsFocused()]}
      onChangeText={(text) => setText(text)}
      value={value}
      selectionColor={theme.colors.text}
      placeholderTextColor={theme.colors.gray}
      onFocus={() => setIsInputFocused(true)}
      onBlur={() => setIsInputFocused(false)}
    />
  )
}

export const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 12,
    fontFamily: "nunito_semi_bold",
    color: theme.colors.text,
    borderColor: theme.colors.purple,
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 12,
    marginRight: 12
  },
  
  inputFocused: {
    backgroundColor: "#3b3b3b",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
  }
});
