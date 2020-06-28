import React from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { auStates } from "../schema";

import { PRIMARY_COLOR } from "../../../constants";

export interface StatePicker {
  value: string;
  error: string;
  showError: boolean;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
}
/**
 * Never got the onBlur to work correctly with the Drop Down picker
 */
export const StatePicker = ({
  value,
  error,
  showError,
  onChange,
  onBlur,
}: StatePicker) => {
  const addZIndex = Platform.OS === "ios" ? { zIndex: 10 } : {};
  return (
    <View style={[styles.formInputContainer, addZIndex]}>
      <Text style={styles.title}>State</Text>
      <DropDownPicker
        defaultValue={value}
        items={auStates.map((item) => ({ label: item, value: item }))}
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
});
