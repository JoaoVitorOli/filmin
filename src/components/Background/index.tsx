import { SafeAreaView, View } from "react-native";
import React from 'react';
import { ReactNode } from "react";

import { styles } from "./styles";

interface BackgroundProps {
  children: ReactNode;
}

export function Background({ children }: BackgroundProps) {
  return (
    <View style={styles.Container}>
      <SafeAreaView>
        {children}
      </SafeAreaView> 
    </View>
  )
}
