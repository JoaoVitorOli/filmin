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
    backgroundColor: theme.colors.shape,
    marginHorizontal: 15,
    marginVertical: 6,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    marginRight: 8
  },

  image: { 
    width: 53, 
    height: 83,
    marginRight: 8,
    borderRadius: 6
  },

  buttonExcludeMovie: {
    marginLeft: "auto",
    padding: 5,
    borderRadius: 6
  },

  middle: {
    flex: 1
  }
});