import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Account from "./screens/Account";
import EditAccount from "./screens/EditAccount";
import PDFViewer from "./screens/PDFViewer";
import { PRIMARY_COLOR } from "./constants";

const Stack = createStackNavigator();

// screen options
const headerOptions: any = {
  title: "My Account",
  headerTintColor: PRIMARY_COLOR,
  headerStyle: {
    height: 100,
  },
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 30,
  },
  headerTitleAlign: "left",
  headerTitleAllowFontScaling: true,
  headerBackTitleVisible: false,
};

const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={Account}
        options={headerOptions}
      />
      <Stack.Screen
        name="EditAccount"
        component={EditAccount}
        options={headerOptions}
      />
      <Stack.Screen name="PDFViewer" component={PDFViewer} />
    </Stack.Navigator>
  </NavigationContainer>
);

const App = () => <AppNavigation />;

export default App;
