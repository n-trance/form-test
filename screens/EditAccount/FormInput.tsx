import React from "react";
import { Text, View, TextInput, KeyboardType } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { styles } from "./index";

export const FormInput = ({
  title,
  value,
  error,
  showError,
  onChange,
  onBlur,
  keyboardType = "default",
  disabled = false,
}: {
  title: string;
  value: string;
  error: string;
  showError: boolean;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  keyboardType?: KeyboardType;
  disabled?: boolean;
}) => {
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

export const FormInputWithMask = ({
  title,
  value,
  error,
  showError,
  onChange,
  onBlur,
  mask,
}: {
  title: string;
  value: string;
  error: string;
  showError: boolean;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  mask: string;
}) => {
  return (
    <View style={styles.formInputContainer}>
      <Text style={styles.title}>{title}</Text>
      <TextInputMask
        style={styles.text}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        type="custom"
        options={{ mask }}
        keyboardType="number-pad"
        returnKeyType="done"
      />
      {!!showError ? <Text style={{ color: "maroon" }}>{error}</Text> : null}
    </View>
  );
};
