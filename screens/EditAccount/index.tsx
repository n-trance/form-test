import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  View,
  TextInput,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useFormik } from "formik";
import { TextInputMask } from "react-native-masked-text";

import { auStates, schema } from "./schema";
import { PRIMARY_COLOR } from "../../constants";

const FormInput = ({
  title,
  value,
  error,
  showError,
  onChange,
  onBlur,
  mask,
}: {
  title: string;
  value: string;
  error: string;
  showError: boolean;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  mask?: string;
}) => {
  const InputComponent = () => {
    if (!!mask) {
      return (
        <TextInputMask
          style={styles.text}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          type="custom"
          options={{ mask }}
        />
      );
    } else {
      return (
        <TextInput
          style={styles.text}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
        />
      );
    }
  };

  return (
    <View style={styles.formInputContainer}>
      <Text style={styles.title}>{title}</Text>
      <InputComponent />
      {!!showError ? <Text style={{ color: "maroon" }}>{error}</Text> : null}
    </View>
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
    <View style={[styles.formInputContainer, { zIndex: 1 }]}>
      <Text style={styles.title}>State</Text>
      <DropDownPicker
        items={auStates.map((item) => ({ label: item, value: item }))}
        containerStyle={styles.dropDownContainer}
        onChangeItem={({ value }: { value: string }) => onChange(value)}
      />
      {!!showError ? <Text style={{ color: "maroon" }}>{error}</Text> : null}
    </View>
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
            updateAccountInfo(formik.values);
            Alert.alert("Account Details Saved");
          }}
          title="Save"
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
        <FormInput
          title="Phone"
          mask={"99 9999 9999"}
          {...formikHelper("phone")}
        />
        <FormInput title="Postcode" {...formikHelper("postcode")} />
        <StatePicker {...formikHelper("state")} />
        <FormInput title="Company Name" {...formikHelper("companyName")} />
        <FormInput
          title="ABN"
          mask={"99 999 999 999"}
          {...formikHelper("abn")}
        />
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
  formInputContainer: { margin: 10 },
  title: {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    fontSize: 18,
    margin: 10,
  },
  text: {
    fontWeight: "500",
    fontSize: 17,
    borderBottomColor: "gray",
    borderBottomWidth: 1.2,
    margin: 10,
  },
  dropDownContainer: { height: 40 },
});
