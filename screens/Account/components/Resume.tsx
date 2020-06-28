import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../styles";

export interface Resume {
  uri: string;
  onPress: () => void;
}

export const Resume = ({ uri, onPress }: Resume) => {
  return (
    <View style={styles.accountItem}>
      <Text style={styles.title}>Resume</Text>
      {uri ? (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.resumeText}>View Here</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.toBeDetermined}>None</Text>
      )}
    </View>
  );
};
