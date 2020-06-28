import React from "react";
import { Text } from "react-native";
import { Input } from "react-native-elements";
export interface FormInput {
  title: string;
  value: string;
  error: string;
  showError: boolean;
  onChange: () => void | void;
  onBlur: () => void| void;
}
export const FormInput = ({
  title,
  value,
  error,
  showError,
  onChange,
  onBlur, }: FormInput) => {
  return (
    <>
      <Text>{title}</Text>
      <Input value={value} onChangeText={onChange} onBlur={onBlur} />
      {!!showError ? <Text style={{ color: "maroon" }}>{error}</Text> : null}
    </>
  );
};
