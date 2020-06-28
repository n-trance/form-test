import React from "react";
import { Text, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { styles } from "../index";

interface FormInputWithMask {
  title: string;
  value: string;
  error: string;
  showError: boolean;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  mask: string;
}

export const FormInputWithMask = ({
  title,
  value,
  error,
  showError,
  onChange,
  onBlur,
  mask,
}: FormInputWithMask) => {
  const errorStyle = { color: "maroon" };
  const showErrorStyle = showError ? errorStyle : null;
  return (
    <View style={styles.formInputContainer}>
      <Text style={[styles.title, showErrorStyle]}>{title}</Text>
      <TextInputMask
        style={[styles.text, showErrorStyle]}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        type="custom"
        options={{ mask }}
        keyboardType="number-pad"
        returnKeyType="done"
      />
      {!!showError ? (
        <Text style={[errorStyle, { textAlign: "right", margin: 10 }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};
