import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  text: {
    color: theme.colors.gray,
    fontSize: 16,
    fontWeight: "500",
  },

  container: {
    alignItems: "center",
    marginVertical: 20
  }
});
