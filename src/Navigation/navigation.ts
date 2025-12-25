import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Define navigation param list
export type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  Categories: undefined;
  KnowledgeSearch: undefined;
  AdminLogin: undefined;
};

// Create stack navigator
export const Stack = createNativeStackNavigator<RootStackParamList>();

// Navigation options theme
export const screenOptions = {
  headerStyle: {
    backgroundColor: "#6200EE",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold" as const,
  },
  headerShadowVisible: true,
};

export { NavigationContainer };
