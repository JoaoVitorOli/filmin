import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  title: {
    color: theme.colors.text,
    maxWidth: "100%",
    fontFamily: "nunito_semi_bold"
  },

  date: {
    color: theme.colors.gray,
    fontFamily: "nunito_regular",
    marginTop: 3,
    fontSize: 12
  },

  card: {
    backgroundColor: theme.colors.background,
    marginHorizontal: 5,
    marginVertical: 4,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center"
  },

  image: { 
    width: 43, 
    height: 63,
    marginRight: 12,
    borderRadius: 6
  },

  middle: {
    flex: 1
  }
});