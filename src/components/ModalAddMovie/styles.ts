import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#00000090"
  },

  modalView: {
    margin: 20,
    backgroundColor: theme.colors.shape,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },

  buttonSearch: {
    backgroundColor: theme.colors.purple,
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    height: 40,
    width: 40,
    borderRadius: 6
  },

  searchArea: {
    flexDirection: "row",
    marginTop: 25,
    alignItems: "center"
  },

  text: {
    color: theme.colors.text,
    fontFamily: "nunito_bold",
  },

  buttonAddMovie: {
    marginTop: 45,
    backgroundColor: theme.colors.purple,
    width: "100%",
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6
  }
})