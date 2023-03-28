import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

  },

  button: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    justifyContent: 'center',
  },

  text: {
    fontSize: 18,
    fontFamily: "nunito_bold",
    alignItems: 'center',
    marginLeft: 5
  },

  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  }
});