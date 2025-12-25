import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import {
  NavigationContainer,
  Stack,
  screenOptions,
} from "./src/Navigation/navigation";
import HomeScreen from "./src/screens/HomeScreen";
import ChatScreen from "./src/screens/ChatScreen";
import CategoryScreen from "./src/screens/CategoryScreen";
import KnowledgeSearchScreen from "./src/screens/KnowledgeSearchScreen";
import AdminLoginScreen from "./src/screens/AdminLoginScreen";

// Custom theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6200EE",
    accent: "#03DAC6",
    background: "#F5F5F5",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "College Chat",
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              title: "Chat",
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Categories"
            component={CategoryScreen}
            options={{
              title: "Categories",
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="KnowledgeSearch"
            component={KnowledgeSearchScreen}
            options={{
              title: "Knowledge Search",
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="AdminLogin"
            component={AdminLoginScreen}
            options={{
              title: "Admin Login",
              headerShown: true,
            }}
          />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </PaperProvider>
  );
}
