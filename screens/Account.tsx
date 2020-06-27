import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

interface UploadResume {
  onPress: () => void;
}

const UploadResume = ({ onPress }: UploadResume) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.resumeButton}>
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
  </TouchableOpacity>
);

interface Resume {
  uri: string;
  onPress: () => void;
}

const Resume = ({ uri, onPress }: Resume) => {
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

const AccountItem = ({ title, value, style }) => {
  return (
    <View style={{ ...style }}>
      <Text style={styles.title}>{title}</Text>
      {!!value ? (
        <Text style={styles.text}>{value}</Text>
      ) : (
        <Text style={styles.toBeDetermined}>None</Text>
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

const validForm: FormValues = {
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

export default function App({ navigation }) {
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
      <AccountItem title="Phone" value={phone} style={styles.accountItem} />
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
      <AccountItem title="ABN" value={abn} style={styles.accountItem} />
      <AccountItem
        title="Hourly Rate (in $)"
        value={hourlyRate}
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
    </ScrollView>
  );
}

const teal = "#1eae95";
const lightBlue = "#0a9bce";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: "row",
    alignContent: "space-between",
  },
  accountItem: { flex: 1, margin: 10 },
  title: { color: teal, fontWeight: "bold", fontSize: 18 },
  text: { fontWeight: "500", fontSize: 16 },
  toBeDetermined: { color: "gray", fontWeight: "500", fontSize: 16 },
  resumeText: { color: lightBlue, fontWeight: "500", fontSize: 16 },
  resumeButton: {
    margin: 10,
    backgroundColor: teal,
    borderRadius: 50,
    height: 50,
    width: 220,
    justifyContent: "center",
  },
});
