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
