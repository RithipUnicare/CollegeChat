import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { knowledgeService } from "../services/knowledgeService";
import { KnowledgeDTO } from "../types/types";
import { wp, hp, fs } from "../utils/responsive";

const KnowledgeSearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState<KnowledgeDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert("Empty Query", "Please enter a search question.");
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const data = await knowledgeService.searchKnowledge(searchQuery.trim());
      setResult(data);
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to search knowledge base. Please try again."
      );
      console.error("Knowledge search error:", error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setResult(null);
    setHasSearched(false);
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
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Search Header */}
          <View style={styles.header}>
            <MaterialCommunityIcons
              name="book-search"
              size={wp(12)}
              color="#6200EE"
            />
            <Text style={styles.headerTitle}>Knowledge Base Search</Text>
            <Text style={styles.headerSubtitle}>
              Search for information and get detailed answers
            </Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <MaterialCommunityIcons
                name="magnify"
                size={24}
                color="#666"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Ask your question here..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                multiline
                maxLength={200}
                onSubmitEditing={handleSearch}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={clearSearch}
                  style={styles.clearButton}
                >
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={20}
                    color="#999"
                  />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={[
                styles.searchButton,
                loading && styles.searchButtonDisabled,
              ]}
              onPress={handleSearch}
              disabled={loading || !searchQuery.trim()}
            >
              <Text style={styles.searchButtonText}>
                {loading ? "Searching..." : "Search"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Loading Indicator */}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#6200EE" />
              <Text style={styles.loadingText}>
                Searching knowledge base...
              </Text>
            </View>
          )}

          {/* Results */}
          {!loading && hasSearched && result && (
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <MaterialCommunityIcons
                  name="lightbulb-on"
                  size={24}
                  color="#FF6F00"
                />
                <Text style={styles.resultHeaderText}>Result Found</Text>
              </View>

              <View style={styles.resultContent}>
                <Text style={styles.resultTitle}>{result.title}</Text>
                <View style={styles.divider} />
                <Text style={styles.resultDescription}>
                  {result.description}
                </Text>
              </View>
            </View>
          )}

          {/* No Results */}
          {!loading && hasSearched && !result && (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons
                name="file-search"
                size={64}
                color="#ccc"
              />
              <Text style={styles.emptyTitle}>No Results Found</Text>
              <Text style={styles.emptyText}>
                Try searching with different keywords
              </Text>
            </View>
          )}

          {/* Initial State */}
          {!hasSearched && (
            <View style={styles.tipsContainer}>
              <Text style={styles.tipsTitle}>Search Tips:</Text>
              <View style={styles.tipItem}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={wp(5)}
                  color="#03DAC6"
                />
                <Text style={styles.tipText}>
                  Be specific with your question
                </Text>
              </View>
              <View style={styles.tipItem}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={wp(5)}
                  color="#03DAC6"
                />
                <Text style={styles.tipText}>Use relevant keywords</Text>
              </View>
              <View style={styles.tipItem}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={wp(5)}
                  color="#03DAC6"
                />
                <Text style={styles.tipText}>Check spelling and grammar</Text>
              </View>
            </View>
          )}
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
    padding: wp(5),
  },
  header: {
    alignItems: "center",
    marginBottom: hp(3),
  },
  headerTitle: {
    fontSize: fs(24),
    fontWeight: "bold",
    color: "#333",
    marginTop: hp(1.2),
  },
  headerSubtitle: {
    fontSize: fs(14),
    color: "#666",
    marginTop: hp(0.6),
    textAlign: "center",
  },
  searchContainer: {
    marginBottom: hp(2.5),
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: wp(3),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    marginBottom: hp(1.5),
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: wp(2.5),
  },
  searchInput: {
    flex: 1,
    fontSize: fs(16),
    color: "#333",
    maxHeight: hp(10),
  },
  clearButton: {
    padding: wp(1.2),
  },
  searchButton: {
    backgroundColor: "#6200EE",
    borderRadius: wp(3),
    paddingVertical: hp(1.7),
    alignItems: "center",
  },
  searchButtonDisabled: {
    backgroundColor: "#ccc",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: fs(16),
    fontWeight: "600",
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: hp(5),
  },
  loadingText: {
    marginTop: hp(1.2),
    color: "#666",
    fontSize: fs(14),
  },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: wp(3),
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E0",
    padding: wp(4),
  },
  resultHeaderText: {
    fontSize: fs(16),
    fontWeight: "600",
    color: "#FF6F00",
    marginLeft: wp(2.5),
  },
  resultContent: {
    padding: wp(5),
  },
  resultTitle: {
    fontSize: fs(20),
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp(1.5),
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginBottom: hp(1.5),
  },
  resultDescription: {
    fontSize: fs(15),
    color: "#555",
    lineHeight: fs(22),
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: hp(7.5),
  },
  emptyTitle: {
    fontSize: fs(18),
    fontWeight: "600",
    color: "#999",
    marginTop: hp(1.8),
  },
  emptyText: {
    fontSize: fs(14),
    color: "#bbb",
    marginTop: hp(1),
  },
  tipsContainer: {
    backgroundColor: "#E8F5E9",
    borderRadius: wp(3),
    padding: wp(5),
    marginTop: hp(2.5),
  },
  tipsTitle: {
    fontSize: fs(16),
    fontWeight: "600",
    color: "#2E7D32",
    marginBottom: hp(1.8),
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1.2),
  },
  tipText: {
    fontSize: fs(14),
    color: "#4CAF50",
    marginLeft: wp(2.5),
  },
});

export default KnowledgeSearchScreen;
