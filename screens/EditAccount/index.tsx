import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import { Input } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";

const FormInput = ({ title, value }) => {
  return (
    <>
      <Text>{title}</Text>
      <Input value={value} />
    </>
  );
};

const StatePicker = () => {
  return (
    <DropDownPicker
      items={[
        { label: "UK", value: "uk" },
        { label: "France", value: "france" },
      ]}
      containerStyle={{ height: 40 }}
    />
  );
};

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Text>edit account</Text>
      <FormInput title="First Name" value="hi" />
      <FormInput title="First Last" value="hi" />
      <FormInput title="Email" value="hi" />
      <FormInput title="Phone" value="hi" />
      <FormInput title="Postcode" value="hi" />
      <StatePicker />
      <FormInput title="State" value="hi" />
      <FormInput title="Company Name" value="hi" />
      <FormInput title="ABN" value="hi" />
      <FormInput title="Hourly Rate (in $)" value="hi" />
      <FormInput title="Insurance Expiry Date" value="hi" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
