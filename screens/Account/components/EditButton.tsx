import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { LIGHT_BLUE } from "../../../constants";

export interface EditButton {
  onPress: () => void;
}

export const EditButton = ({ onPress }: EditButton) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={{ color: LIGHT_BLUE, fontSize: 18, margin: 10 }}>Edit</Text>
  </TouchableOpacity>
);
