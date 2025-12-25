import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation/navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { wp, hp, fs } from "../utils/responsive";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const menuItems = [
    {
      title: "Chat with Bot",
      icon: "chat",
      color: "#6200EE",
      route: "Chat" as const,
      description: "Ask questions and get instant answers",
    },
    {
      title: "Categories",
      icon: "folder-multiple",
      color: "#03DAC6",
      route: "Categories" as const,
      description: "Browse available categories",
    },
    {
      title: "Knowledge Search",
      icon: "book-search",
      color: "#FF6F00",
      route: "KnowledgeSearch" as const,
      description: "Search the knowledge base",
    },
    {
      title: "Admin Login",
      icon: "shield-account",
      color: "#B00020",
      route: "AdminLogin" as const,
      description: "Administrator access",
    },
  ];

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "bottom", "left", "right"]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <MaterialCommunityIcons name="school" size={wp(15)} color="#6200EE" />
          <Text style={styles.title}>College Chat</Text>
          <Text style={styles.subtitle}>Your AI-powered assistant</Text>
        </View>

        {/* Menu Cards */}
        <View style={styles.cardsContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, { borderLeftColor: item.color }]}
              onPress={() => navigation.navigate(item.route)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: item.color + "20" },
                ]}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={wp(8)}
                  color={item.color}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={wp(6)}
                color="#999"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Powered by College Chatbot API</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContent: {
    flexGrow: 1,
    padding: wp(5),
  },
  header: {
    alignItems: "center",
    marginBottom: hp(3.5),
    marginTop: hp(2.5),
  },
  title: {
    fontSize: fs(32),
    fontWeight: "bold",
    color: "#333",
    marginTop: hp(1.2),
  },
  subtitle: {
    fontSize: fs(16),
    color: "#666",
    marginTop: hp(0.6),
  },
  cardsContainer: {
    gap: hp(1.8),
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: wp(3),
    padding: wp(5),
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: wp(1),
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp(3.5),
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: fs(18),
    fontWeight: "600",
    color: "#333",
    marginBottom: hp(0.5),
  },
  cardDescription: {
    fontSize: fs(14),
    color: "#666",
  },
  footer: {
    marginTop: hp(5),
    alignItems: "center",
    paddingBottom: hp(2.5),
  },
  footerText: {
    fontSize: fs(12),
    color: "#999",
  },
});

export default HomeScreen;
