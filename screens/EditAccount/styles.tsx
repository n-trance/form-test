import { StyleSheet } from "react-native";
import { PRIMARY_COLOR } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formInputContainer: { margin: 10 },
  title: {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    fontSize: 18,
    margin: 10,
  },
  text: {
    fontWeight: "500",
    fontSize: 17,
    borderBottomColor: "gray",
    borderBottomWidth: 1.2,
    margin: 10,
  },
  dropDownContainer: { height: 40 },
  dropDown: { zIndex: 1 },
});
