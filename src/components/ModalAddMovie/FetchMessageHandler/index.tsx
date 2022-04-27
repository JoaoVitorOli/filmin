import React from "react";
import { Text, View } from "react-native";
import { default as IconMaterialIcons } from 'react-native-vector-icons/MaterialIcons';
import { default as IconIonicons } from 'react-native-vector-icons/Ionicons';

import { styles } from "./styles";

interface FetchMessageHandlerProps {
  unforeseen: string;
}

export function FetchMessageHandler({
  unforeseen
}: FetchMessageHandlerProps) {

  switch (unforeseen) {
    case "noConnection":
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Sem conexão com a internet.</Text>
          <IconMaterialIcons
            name="signal-cellular-connected-no-internet-4-bar"
            size={15}
            color={"#686868"}
          />
        </View>
      );
    case "noResults":
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Não achamos nada.</Text>
          <IconIonicons 
            name="md-sad-outline"
            size={15}
            color={"#686868"}
          />
        </View>
      );
    default: 
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Ocorreu um erro.</Text>
          <IconMaterialIcons
            name="error-outline"
            size={15}
            color={"#686868"}
          />
        </View>
      );
  }
}