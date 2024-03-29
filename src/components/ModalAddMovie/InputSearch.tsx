import React, { useState } from "react";
import { 
  StyleSheet, 
  TextInput, 
  View,
} from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { theme } from "../../styles/theme";

interface InputSearchProps {
  setText: (value: string) => void;
  value: string;
}

export function InputSearch({ setText, value }: InputSearchProps) {
  const [isInputFocused, setIsInputFocused] = useState(false);

  function verifyIfInputIsFocused() {
    if (isInputFocused) {
      return styles.inputFocused;
    } else {
      return null;
    }
  }

  return (
    <View style={[styles.container, verifyIfInputIsFocused()]}>
      <Icon
        style={{
          marginHorizontal: 6
        }}
        name="plus"
        size={20}
        color={"#d2d2d2"}
        />
      <TextInput
        placeholder="Nome do filme..."
        style={styles.input}
        onChangeText={(text) => setText(text)}
        value={value}
        selectionColor={theme.colors.text}
        placeholderTextColor={theme.colors.gray}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: theme.colors.purple,
    borderWidth: 1,
    width: "100%",
    height: 40,
    marginRight: 6,
    borderRadius: 6,
    position: "relative"
  },

  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: "nunito_semi_bold",
    width: "100%",
    color: theme.colors.text
  },

  inputFocused: {
    backgroundColor: "#3b3b3b",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
  }
})
