import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";

const UploadResume = () => (
  <View
    style={{
      backgroundColor: teal,
      borderRadius: 50,
      height: 50,
      width: 220,
      justifyContent: "center",
    }}
  >
    <Text
      style={{
        color: "white",
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
      }}
    >
      Upload new Resume
    </Text>
  </View>
);

const AccountItem = ({ title, value, style }) => {
  return (
    <View style={{ ...style }}>
      <Text style={styles.title}>{title}</Text>
      {!!value ? (
        <Text style={styles.text}>{value}</Text>
      ) : (
        <Text style={styles.toBeDetermined}>Bruce Banner</Text>
      )}
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

export default function App() {
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

  return (
    <ScrollView style={styles.container}>
      <View
        style={{ flex: 1, flexDirection: "row", alignContent: "space-between" }}
      >
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
      <AccountItem title="Phone" value={phone} style={styles.accountItem} />
      <AccountItem
        title="Postcode"
        value={postcode}
        style={styles.accountItem}
      />
      <AccountItem title="State" value={state} style={styles.accountItem} />
      <AccountItem
        title="Company Name"
        value={companyName}
        style={styles.accountItem}
      />
      <AccountItem title="ABN" value={abn} style={styles.accountItem} />
      <AccountItem
        title="Hourly Rate (in $)"
        value={hourlyRate}
        style={styles.accountItem}
      />
      <Text>Resume</Text>
      <UploadResume />
      <AccountItem
        title="Insurance Expiry Date"
        value={insuranceExpiryDate}
        style={styles.accountItem}
      />
    </ScrollView>
  );
}

const teal = "#1eae95";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  accountItem: { flex: 1, margin: 10 },
  title: { color: teal, fontWeight: "bold", fontSize: 18 },
  text: { fontWeight: "500", fontSize: 16 },
  toBeDetermined: { color: "gray", fontWeight: "500", fontSize: 16 },
});
