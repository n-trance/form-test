import React from "react";
import { Text, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { styles } from "../styles";

export interface AccountItem {
  title: string;
  value: string;
  mask?: string;
  style: any;
}

export const AccountItem = ({ title, value, mask, style }: AccountItem) => {
  let Item;
  if (!!value && !!mask) {
    Item = () => (
      <TextInputMask
        value={value}
        type="custom"
        options={{ mask }}
        style={styles.text}
      />
    );
  } else if (!!value) {
    Item = () => <Text style={styles.text}>{value}</Text>;
  } else {
    Item = () => <Text style={styles.toBeDetermined}>None</Text>;
  }

  return (
    <View style={{ ...style }}>
      <Text style={styles.title}>{title}</Text>
      <Item />
    </View>
  );
};
