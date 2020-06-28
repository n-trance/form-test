import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import { Input } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import { useFormik } from "formik";

import { auStates, schema } from "./schema";

const FormInput = ({
  title,
  value,
  error,
  showError,
  onChange,
  onBlur,
}: {
  title: string;
  value: string;
  error: string;
  showError: boolean;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
}) => {
  return (
    <>
      <Text>{title}</Text>
      <Input value={value} onChangeText={onChange} onBlur={onBlur} />
      {!!showError ? <Text style={{ color: "maroon" }}>{error}</Text> : null}
    </>
  );
};

const StatePicker = ({
  error,
  showError,
  onChange,
  onBlur,
}: {
  error: string;
  showError: boolean;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
}) => {
  return (
    <>
      <DropDownPicker
        items={auStates.map((item) => ({ label: item, value: item }))}
        containerStyle={{ height: 40 }}
        onChangeItem={({ value }: { value: string }) => onChange(value)}
      />
      {!!showError ? <Text style={{ color: "maroon" }}>{error}</Text> : null}
    </>
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

export default function App({ navigation, route }) {
  // get params
  const accountInfo = route.params?.accountInfo || initialValues;
  const { updateAccountInfo } = route.params;

  const formik = useFormik({
    initialValues: accountInfo,
    onSubmit: () => {}, // not required
    validationSchema: schema,
  });

  // on mount validate form
  useEffect(() => {
    formik.validateForm();
  }, []);

  // can save if form is valid
  // checks if isValid or form Values have updated
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          disabled={!formik.isValid}
          onPress={() => {
            console.log("formik vals", formik.values);
            updateAccountInfo(formik.values);
          }}
          title="save"
        />
      ),
    });
  }, [formik.isValid, formik.values]);

  const formikHelper = (value: keyof FormValues) => ({
    value: formik.values[value] as string,
    onChange: formik.handleChange(value) as (e: any) => void,
    onBlur: formik.handleBlur(value) as (e: any) => void,
    showError: !!formik.touched[value] && !!formik.errors[value],
    error: formik.errors[value] as string,
  });

  return (
    <KeyboardAvoidingView
      enabled
      behavior="height"
      keyboardVerticalOffset={120}
      style={styles.container}
    >
      <ScrollView style={styles.container}>
        <FormInput title="First Name" {...formikHelper("firstName")} />
        <FormInput title="Last Name" {...formikHelper("lastName")} />
        <FormInput title="Email" {...formikHelper("email")} />
        <FormInput title="Phone" {...formikHelper("phone")} />
        <FormInput title="Postcode" {...formikHelper("postcode")} />
        <StatePicker {...formikHelper("state")} />
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
