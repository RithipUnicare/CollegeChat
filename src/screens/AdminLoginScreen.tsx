import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { adminService } from "../services/adminService";
import { wp, hp, fs } from "../utils/responsive";

const AdminLoginScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Missing Fields", "Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {
      const token = await adminService.login(username.trim(), password);
      Alert.alert(
        "Login Successful",
        "You have been logged in as administrator.",
        [
          {
            text: "OK",
            onPress: () => {
              setUsername("");
              setPassword("");
            },
          },
        ]
      );
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Invalid credentials. Please try again.";
      Alert.alert("Login Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "bottom", "left", "right"]}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="shield-account"
                size={wp(16)}
                color="#6200EE"
              />
            </View>
            <Text style={styles.title}>Admin Login</Text>
            <Text style={styles.subtitle}>Access administrator dashboard</Text>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            {/* Username Input */}
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="account"
                size={wp(5.5)}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="lock"
                size={wp(5.5)}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <MaterialCommunityIcons
                  name={showPassword ? "eye-off" : "eye"}
                  size={wp(5.5)}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                loading && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <MaterialCommunityIcons
                    name="login"
                    size={wp(5.5)}
                    color="#fff"
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.loginButtonText}>Login</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Info Banner */}
            <View style={styles.infoBanner}>
              <MaterialCommunityIcons
                name="information"
                size={wp(4.5)}
                color="#FF6F00"
              />
              <Text style={styles.infoText}>
                Admin access only. Unauthorized access is prohibited.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: hp(5),
  },
  iconContainer: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(15),
    backgroundColor: "#E8E0FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp(2.5),
  },
  title: {
    fontSize: fs(28),
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp(1),
  },
  subtitle: {
    fontSize: fs(15),
    color: "#666",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: wp(4),
    padding: wp(6),
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: wp(3),
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  inputIcon: {
    marginRight: wp(2.5),
  },
  input: {
    flex: 1,
    paddingVertical: hp(1.7),
    fontSize: fs(16),
    color: "#333",
  },
  eyeIcon: {
    padding: wp(1.2),
  },
  loginButton: {
    backgroundColor: "#6200EE",
    borderRadius: wp(3),
    paddingVertical: hp(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(1),
    elevation: 2,
    shadowColor: "#6200EE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  loginButtonDisabled: {
    backgroundColor: "#ccc",
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonIcon: {
    marginRight: wp(2),
  },
  loginButtonText: {
    color: "#fff",
    fontSize: fs(18),
    fontWeight: "600",
  },
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E0",
    borderRadius: wp(2),
    padding: wp(3),
    marginTop: hp(2.5),
  },
  infoText: {
    flex: 1,
    fontSize: fs(12),
    color: "#FF6F00",
    marginLeft: wp(2),
  },
});

export default AdminLoginScreen;
