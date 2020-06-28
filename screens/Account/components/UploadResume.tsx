import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../styles";

export interface UploadResume {
  onPress: () => void;
}

export const UploadResume = ({ onPress }: UploadResume) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.resumeButton}>
      <Text style={styles.resumeButtonText}>Upload new Resume</Text>
    </View>
  </TouchableOpacity>
);
