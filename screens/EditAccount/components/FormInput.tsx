import React from "react";
import { Text, View, TextInput, KeyboardType } from "react-native";
import { styles } from "../index";

export interface FormInput {
  title: string;
  value: string;
  error: string;
  showError: boolean;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  keyboardType?: KeyboardType;
  disabled?: boolean;
}

export const FormInput = ({
  title,
  value,
  error,
  showError,
  onChange,
  onBlur,
  keyboardType = "default",
  disabled = false,
}: FormInput) => {
  return (
    <View style={styles.formInputContainer}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        editable={!disabled}
        style={styles.text}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        keyboardType={keyboardType}
        returnKeyType="done"
      />
      {!!showError ? <Text style={{ color: "maroon" }}>{error}</Text> : null}
    </View>
  );
};
