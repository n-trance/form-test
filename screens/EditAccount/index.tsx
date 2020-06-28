import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  View,
  Alert,
  Platform,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useFormik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import { auStates, schema } from "./schema";
import { PRIMARY_COLOR } from "../../constants";
import { FormInput, FormInputWithMask } from "./FormInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationProp, RouteProp } from "@react-navigation/native";

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
    <View style={[styles.formInputContainer, styles.dropDown]}>
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

interface EditAccountProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}

export default function EditAccount({ navigation, route }: EditAccountProps) {
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

  // date picker states
  const [show, setShow] = useState(false);

  const onChangeDate = (_: any, selectedDate: Date | undefined) => {
    // onClose or onSelect date
    if (Platform.OS === "android") {
      setShow(false);
    }
    const currentDate =
      selectedDate || new Date(formik.values.insuranceExpiryDate);
    const date = moment(currentDate).format("DD MMM YYYY");
    formik.setFieldValue("insuranceExpiryDate", date);
  };

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
        <FormInput
          title="Email"
          keyboardType="email-address"
          {...formikHelper("email")}
        />
        <FormInputWithMask
          title="Phone"
          mask={"99 9999 9999"}
          {...formikHelper("phone")}
        />
        <FormInput
          title="Postcode"
          keyboardType="number-pad"
          {...formikHelper("postcode")}
        />
        <StatePicker {...formikHelper("state")} />
        <FormInput title="Company Name" {...formikHelper("companyName")} />
        <FormInputWithMask
          title="ABN"
          mask={"99 999 999 999"}
          {...formikHelper("abn")}
        />
        <FormInput
          title="Hourly Rate (in $)"
          keyboardType="numeric"
          {...formikHelper("hourlyRate")}
        />
        <TouchableOpacity onPress={() => setShow(true)}>
          <FormInput
            disabled
            title="Insurance Expiry Date"
            {...formikHelper("insuranceExpiryDate")}
          />
        </TouchableOpacity>
        {show && (
          <>
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date(formik.values.insuranceExpiryDate)}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
            {Platform.OS === "ios" ? (
              <Button title="close" onPress={() => setShow(false)} />
            ) : null}
          </>
        )}
        {/* spacing at bottom of screen */}
        <View style={{ height: 200 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export const styles = StyleSheet.create({
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
  dropDown: { zIndex: 1 },
});
