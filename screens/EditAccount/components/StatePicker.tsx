import React from "react";
import { Text, View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { auStates } from "../schema";

import { PRIMARY_COLOR } from "../../../constants";

export interface StatePicker {
  error: string;
  showError: boolean;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
}
/**
 * Never got the onBlur to work correctly with the Drop Down picker
 */
export const StatePicker = ({
  error,
  showError,
  onChange,
  onBlur,
}: StatePicker) => {
  return (
    <View style={[styles.formInputContainer, styles.dropDown]}>
      <Text style={styles.title}>State</Text>
      <DropDownPicker
        items={auStates.map((item) => ({ label: item, value: item }))}
        containerStyle={styles.dropDownContainer}
        onChangeItem={({ value }: { value: string }) => onChange(value)}
      />
      {!!showError ? <Text style={{ color: "maroon" }}>{error}</Text> : null}
    </View>
  );
};

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
