import { StyleSheet } from "react-native";
import { PRIMARY_COLOR, LIGHT_BLUE } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: "row",
    alignContent: "space-between",
  },
  accountItem: { flex: 1, margin: 10 },
  title: { color: PRIMARY_COLOR, fontWeight: "bold", fontSize: 18 },
  text: {
    fontWeight: "500",
    fontSize: 17,
  },
  toBeDetermined: { color: "gray", fontWeight: "500", fontSize: 16 },
  resumeText: { color: LIGHT_BLUE, fontWeight: "500", fontSize: 16 },
  resumeButton: {
    margin: 10,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 50,
    height: 50,
    width: 220,
    justifyContent: "center",
  },
  resumeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
});
