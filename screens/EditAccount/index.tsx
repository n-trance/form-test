import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Input } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import { useFormik } from "formik";

import { auStates, schema } from "./schema";

const FormInput = ({ title, value, error, showError, onChange, onBlur }) => {
  return (
    <>
      <Text>{title}</Text>
      <Input value={value} onChangeText={onChange} onBlur={onBlur} />
      {!!showError ? <Text style={{ color: "maroon" }}>{error}</Text> : null}
    </>
  );
};

const StatePicker = () => {
  return (
    <DropDownPicker
      items={auStates.map((item) => ({ label: item, value: item }))}
      containerStyle={{ height: 40 }}
    />
  );
};

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postcode: string;
  state: string;
  companyName: string;
  abn: string;
  hourlyRate: string;
  insuranceExpiryDate: string;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  postcode: "",
  state: "",
  companyName: "",
  abn: "",
  hourlyRate: "",
  insuranceExpiryDate: "",
};

const onSubmit = (values) => {
  console.log("vals", values);
};

export default function App() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: schema,
  });

  const formikHelper = (value: keyof FormValues) => ({
    value: formik.values[value],
    onChange: formik.handleChange(value),
    onBlur: formik.handleBlur(value),
    showError: formik.touched[value] && !!formik.errors[value],
    error: formik.errors[value],
  });

  return (
    <KeyboardAvoidingView
      enabled
      behavior="height"
      keyboardVerticalOffset={120}
      style={styles.container}
    >
      <ScrollView style={styles.container}>
        <Text>edit account</Text>
        <FormInput title="First Name" {...formikHelper("firstName")} />
        <FormInput title="Last Name" {...formikHelper("lastName")} />
        <FormInput title="Email" {...formikHelper("email")} />
        <FormInput title="Phone" {...formikHelper("phone")} />
        <FormInput title="Postcode" {...formikHelper("postcode")} />
        <StatePicker />
        <FormInput title="Company Name" {...formikHelper("companyName")} />
        <FormInput title="ABN" {...formikHelper("abn")} />
        <FormInput title="Hourly Rate (in $)" {...formikHelper("hourlyRate")} />
        <FormInput
          title="Insurance Expiry Date"
          {...formikHelper("insuranceExpiryDate")}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
