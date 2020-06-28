import React, { useState, ReactElement, useEffect } from "react";
import { View, ScrollView } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { NavigationProp } from "@react-navigation/native";

import { UploadResume } from "./components/UploadResume";
import { Resume } from "./components/Resume";
import { AccountItem } from "./components/AccountItem";
import { EditButton } from "./components/EditButton";
import { styles } from "./styles";

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

// EXAMPLE OF VALID FORM: replace initial value with this to prefill form.
const validForm: FormValues = {
  firstName: "Bruce",
  lastName: "Banner",
  email: "bruce.banner@marvel.com",
  phone: "0400000000",
  postcode: "2093",
  state: "NSW",
  companyName: "Marvel Ltd",
  abn: "12123123123",
  hourlyRate: "395",
  insuranceExpiryDate: "31 May 1970",
};

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

interface Account {
  navigation: NavigationProp<any>;
}

export default function Account({ navigation }: Account) {
  const [info, setInfo] = useState(initialValues);

  const {
    firstName,
    lastName,
    email,
    phone,
    postcode,
    state,
    companyName,
    abn,
    hourlyRate,
    insuranceExpiryDate,
  } = info;

  // on component update
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <EditButton
          onPress={() =>
            navigation.navigate("EditAccount", {
              accountInfo: info,
              updateAccountInfo: setInfo,
            })
          }
        />
      ),
    });
  });

  const [fileUri, setFileUri] = useState("");

  const getFile = async () => {
    const file = await DocumentPicker.getDocumentAsync();
    if (file.type === "success") {
      setFileUri(file.uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.horizontalContainer}>
        <AccountItem
          title="First Name"
          value={firstName}
          style={styles.accountItem}
        />
        <AccountItem
          title="last Name"
          value={lastName}
          style={styles.accountItem}
        />
      </View>
      <AccountItem title="Email" value={email} style={styles.accountItem} />
      <AccountItem
        title="Phone"
        value={phone}
        style={styles.accountItem}
        mask="99 9999 9999"
      />
      <View style={styles.horizontalContainer}>
        <AccountItem
          title="Postcode"
          value={postcode}
          style={styles.accountItem}
        />
        <AccountItem title="State" value={state} style={styles.accountItem} />
      </View>
      <AccountItem
        title="Company Name"
        value={companyName}
        style={styles.accountItem}
      />
      <AccountItem
        title="ABN"
        value={abn}
        style={styles.accountItem}
        mask="99 999 999 999"
      />
      <AccountItem
        title="Hourly Rate (in $)"
        value={!!hourlyRate ? `$${hourlyRate} inc GST` : ""}
        style={styles.accountItem}
      />
      <View style={styles.horizontalContainer}>
        <Resume
          uri={fileUri}
          onPress={() => {
            navigation.navigate("PDFViewer", { uri: fileUri });
          }}
        />
        <UploadResume onPress={getFile} />
      </View>
      <AccountItem
        title="Insurance Expiry Date"
        value={insuranceExpiryDate}
        style={styles.accountItem}
      />
      {/* spacing at bottom of screen */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
