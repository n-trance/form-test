import React from "react";
import { Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { auStates } from "./schema";
export interface StatePicker {
  error: string;
  showError: string;
  onChange: () => void;
  onBlur: () => void;
}
export const StatePicker = ({ error, showError, onChange, onBlur }: StatePicker) => {
  return (
    <>
      <DropDownPicker
        items={auStates.map((item) => ({ label: item, value: item }))}
        containerStyle={{ height: 40 }}
        onChangeItem={({ value }: string) => onChange(value)} />
      {!!showError ? <Text style={{ color: "maroon" }}>{error}</Text> : null}
    </>
  );
};
