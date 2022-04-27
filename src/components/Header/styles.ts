import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 190,
    backgroundColor: theme.colors.shape,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  wrapper: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 13,
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
  },

  middle: {
    marginTop: 12
  },

  middleTextWithGradient: {
    flexDirection: "row",
  },

  text: {
    color: theme.colors.text,
    fontFamily: "nunito_bold",
    fontSize: 18
  },

  textGradient: {
    color: theme.colors.purple,
    fontFamily: "nunito_bold",
    fontSize: 18,
    marginHorizontal: 3.5
  },

  bottom: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: "auto"
  },

  bottomButtonsContainer: {
    flexDirection: "row",
    alignItems: "flex-end"
  },

  textSmall: {
    color: theme.colors.gray,
    fontFamily: "nunito_bold",
    fontSize: 13,
  },

  profileContainer: {
    marginLeft: "auto"
  },

  nameSkeleton: {
    backgroundColor: theme.colors.purpleTransparent,
    height: 20,
    width: 120,
    marginTop: 8,
    borderRadius: 5
  }
});