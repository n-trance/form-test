import React, { useState, useEffect } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  Button,
  View,
  Alert,
  Platform,
} from "react-native";
import { useFormik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import { schema } from "./schema";
import { FormInput } from "./components/FormInput";
import { FormInputWithMask } from "./components/FormInputWithMask";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { StatePicker } from "./components/StatePicker";
import { SaveButton } from "./components/SaveButton";
import { FormValues } from "../../types/FormValues";
import { styles } from "./styles";

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

interface EditAccount {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}

export default function EditAccount({ navigation, route }: EditAccount) {
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
        <SaveButton
          disabled={!formik.isValid}
          onPress={() => {
            updateAccountInfo(formik.values);
            Alert.alert("Account Details Saved");
          }}
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
              value={
                !!formik.values.insuranceExpiryDate
                  ? new Date(formik.values.insuranceExpiryDate)
                  : new Date()
              }
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
