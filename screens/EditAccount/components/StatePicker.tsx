import React from "react";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { auStates } from "../schema";
import { styles } from "../index";
export interface StatePicker {
  error: string;
  showError: boolean;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
}
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
