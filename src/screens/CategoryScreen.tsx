import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { categoryService } from "../services/categoryService";
import { CategoryDTO } from "../types/types";
import { wp, hp, fs } from "../utils/responsive";

const CategoryScreen: React.FC = () => {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      Alert.alert("Error", "Failed to load categories. Please try again.");
      console.error("Categories error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCategories();
    setRefreshing(false);
  };

  const handleCategoryPress = (category: CategoryDTO) => {
    // You can add navigation or action here
    Alert.alert(category.name, `Category ID: ${category.id}`);
  };

  const getCategoryIcon = (index: number): string => {
    const icons = [
      "book-open-variant",
      "school",
      "account-group",
      "calendar-month",
      "information",
      "help-circle",
      "library",
      "certificate",
    ];
    return icons[index % icons.length];
  };

  const getCategoryColor = (index: number): string => {
    const colors = [
      "#6200EE",
      "#03DAC6",
      "#FF6F00",
      "#B00020",
      "#018786",
      "#3700B3",
      "#00C853",
      "#AA00FF",
    ];
    return colors[index % colors.length];
  };

  const renderCategory = ({
    item,
    index,
  }: {
    item: CategoryDTO;
    index: number;
  }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => handleCategoryPress(item)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: getCategoryColor(index) + "20" },
        ]}
      >
        <MaterialCommunityIcons
          name={getCategoryIcon(index) as any}
          size={wp(8)}
          color={getCategoryColor(index)}
        />
      </View>
      <View style={styles.categoryContent}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryId}>ID: {item.id}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={wp(6)} color="#999" />
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="folder-alert" size={wp(16)} color="#ccc" />
      <Text style={styles.emptyText}>No categories available</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView
        style={styles.container}
        edges={["top", "bottom", "left", "right"]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200EE" />
          <Text style={styles.loadingText}>Loading categories...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "bottom", "left", "right"]}
    >
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#6200EE"]}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: hp(1.2),
    color: "#666",
    fontSize: fs(16),
  },
  listContent: {
    padding: wp(4),
    paddingBottom: hp(3.5),
  },
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: wp(3),
    padding: wp(4),
    marginBottom: hp(1.5),
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
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
  categoryContent: {
    flex: 1,
  },
  categoryName: {
    fontSize: fs(18),
    fontWeight: "600",
    color: "#333",
    marginBottom: hp(0.5),
  },
  categoryId: {
    fontSize: fs(13),
    color: "#666",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(10),
  },
  emptyText: {
    marginTop: hp(1.8),
    fontSize: fs(16),
    color: "#999",
  },
});

export default CategoryScreen;
