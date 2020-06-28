import React from "react";
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
        options={{ title: "My Account" }}
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
