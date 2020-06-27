import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Account from "./screens/Account";
import EditAccount from "./screens/EditAccount";
import PDFViewer from "./screens/PDFViewer";

const Stack = createStackNavigator();

const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={Account}
        options={({ navigation }) => ({
          title: "My Account",
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate("EditAccount")}
              title="edit"
            />
          ),
        })}
      />
      <Stack.Screen
        name="EditAccount"
        component={EditAccount}
        options={{ title: "My Account" }}
      />
      <Stack.Screen name="PDFViewer" component={PDFViewer} />
    </Stack.Navigator>
  </NavigationContainer>
);

const App = () => <AppNavigation />;

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
