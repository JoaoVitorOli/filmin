import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "75%",
    alignItems: "center",
    justifyContent: "center"
  },

  list: {
    width: "100%",
    height: "100%",
    position: "relative"
  },

  noMovies: { 
    width: 200, 
    height: 200, 
    alignItems: "center",
    justifyContent: "flex-end"
  },

  text: {
    color: theme.colors.text,
    fontFamily: "nunito_semi_bold",
    fontSize: 14,
    bottom: 20
  }
});