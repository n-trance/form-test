import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LIGHT_BLUE } from "../../../constants";

interface SaveButton {
  onPress: () => void;
  disabled?: boolean;
}

export const SaveButton = ({ onPress, disabled }: SaveButton) => {
  if (!disabled) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={{ color: LIGHT_BLUE, fontSize: 18, margin: 10 }}>
          Save
        </Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <Text style={{ color: "gray", fontSize: 18, margin: 10 }}>Save</Text>
    );
  }
};
