import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "flex-start"
  },

  heading: {
    fontSize: 18,
    color: theme.colors.text,
    fontFamily: "nunito_bold",
    marginBottom: 30,
    alignSelf: "center"
  }, 

  text: {
    color: theme.colors.text,
    fontFamily: "nunito_regular",
  },

  inputContainer: {
    marginVertical: 18,
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },

  buttonDownloadMovies: {
    backgroundColor: theme.colors.purple,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    padding: 10,
  },

  buttonGeneratShareCode: {
    backgroundColor: theme.colors.purple,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 40,
    width: 115
  }
});