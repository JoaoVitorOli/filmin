import Clipboard from "@react-native-clipboard/clipboard";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "../../styles/theme";

interface CopyCodeComponentProps {
  androidId: string;
}

export function CopyCodeComponent({ androidId }: CopyCodeComponentProps) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  function setToClipboard() {
    Clipboard.setString(androidId);
    setIsCopied(true);
  }

  const containerToggleColorWhenCodeIsCopied = {
    borderColor: isCopied ? theme.colors.green : theme.colors.purple,
    backgroundColor: isCopied ? theme.colors.greenTransparent : theme.colors.purpleTransparent,
  }

  const buttonCopyToggleColorWhenCodeIsCopied = {
    backgroundColor: isCopied ? theme.colors.green : theme.colors.purple,
  }

  return (
  <View style={[styles.container, containerToggleColorWhenCodeIsCopied]}>
    <Text style={styles.text}>
      {androidId}
    </Text>

    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.buttonCopy, buttonCopyToggleColorWhenCodeIsCopied]}
      onPress={() => setToClipboard()}
    >
      <Text style={styles.text}>
        {isCopied ? "copiado!" : "copiar"}
      </Text>
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 2,
    borderRadius: 5,
    alignItems: "center",
    paddingLeft: 12
  },

  text: {
    color: theme.colors.text,
    fontFamily: "nunito_bold",
  },

  buttonCopy: {
    marginLeft: "auto",
    backgroundColor: theme.colors.purple,
    paddingHorizontal: 12,
    height: 40,
    justifyContent: "center",
    borderRadius: 5
  }
});
