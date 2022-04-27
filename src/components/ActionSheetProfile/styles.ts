import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center"
  },

  heading: {
    fontSize: 18,
    color: theme.colors.text,
    fontFamily: "nunito_bold",
    marginBottom: 30
  }, 

  photoEditSection: {
    flexDirection: "row",
    marginTop: 20
  },

  button: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  
  buttonText: {
    color: theme.colors.text,
    fontFamily: "nunito_bold"
  },

  nameEditSection: {
    flexDirection: "row",
    marginTop: 30
  },

  input: {
    borderRadius: 6,
    borderColor: theme.colors.purple,
    borderWidth: 1,
    height: 38,
    width: 220,
    marginRight: 8,
    paddingHorizontal: 10,
    fontFamily: "nunito_semi_bold",
    color: theme.colors.text
  },

  inputFocused: {
    backgroundColor: "#3b3b3b",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },

  buttonShare: {
    backgroundColor: theme.colors.purple,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 20,
    top: 15,
    borderRadius: 5
  }
});