import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "25%",
    backgroundColor: theme.colors.shape,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  wrapper: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  top: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row"
  },

  icon: {
    width: 23,
    height: 23,
    borderRadius: 6,
    marginRight: 8
  },

  textLogo: {
    color: theme.colors.text,
    fontSize: 20,
    fontFamily: "inter_bold"
  }
});