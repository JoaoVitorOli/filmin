import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../styles/theme";

export function MovieSkeleton() {
  return (
    <View style={styles.container} />
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.purpleTransparent,
    marginHorizontal: 15,
    marginVertical: 6,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 100,
  }
});
