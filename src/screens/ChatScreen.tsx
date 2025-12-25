import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { chatService } from "../services/chatService";
import { ChatMessage } from "../types/types";
import { wp, hp, fs } from "../utils/responsive";

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Add welcome message
    const welcomeMessage: ChatMessage = {
      id: Date.now().toString(),
      message: "Hello! I'm your college assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setLoading(true);

    try {
      const response = await chatService.processChat(inputText);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: response.reply,
        isUser: false,
        source: response.source,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // Auto-scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      Alert.alert("Error", "Failed to get response. Please try again.");
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <View
      style={[
        styles.messageContainer,
        item.isUser ? styles.userMessageContainer : styles.botMessageContainer,
      ]}
    >
      {!item.isUser && (
        <View style={styles.botIconContainer}>
          <MaterialCommunityIcons name="robot" size={wp(6)} color="#6200EE" />
        </View>
      )}
      <View
        style={[
          styles.messageBubble,
          item.isUser ? styles.userBubble : styles.botBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.isUser ? styles.userMessageText : styles.botMessageText,
          ]}
        >
          {item.message}
        </Text>
        {/* {item.source && (
          <View style={styles.sourceBadge}>
            <MaterialCommunityIcons name="information" size={12} color="#666" />
            <Text style={styles.sourceText}>Source: {item.source}</Text>
          </View>
        )} */}
        <Text style={styles.timestamp}>
          {item.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
      {item.isUser && (
        <View style={styles.userIconContainer}>
          <MaterialCommunityIcons name="account" size={wp(6)} color="#fff" />
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "bottom", "left", "right"]}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 90}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#6200EE" />
            <Text style={styles.loadingText}>Typing...</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
            editable={!loading}
          />
          <TouchableOpacity
            style={[styles.sendButton, loading && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={loading || !inputText.trim()}
          >
            <MaterialCommunityIcons
              name="send"
              size={wp(6)}
              color={loading || !inputText.trim() ? "#ccc" : "#fff"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  messagesList: {
    padding: wp(4),
    paddingBottom: hp(1.2),
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: hp(1.8),
    alignItems: "flex-end",
  },
  userMessageContainer: {
    justifyContent: "flex-end",
  },
  botMessageContainer: {
    justifyContent: "flex-start",
  },
  botIconContainer: {
    width: wp(9.5),
    height: wp(9.5),
    borderRadius: wp(4.75),
    backgroundColor: "#E8E0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp(2),
  },
  userIconContainer: {
    width: wp(9.5),
    height: wp(9.5),
    borderRadius: wp(4.75),
    backgroundColor: "#6200EE",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: wp(2),
  },
  messageBubble: {
    maxWidth: "75%",
    padding: wp(3),
    borderRadius: wp(4),
  },
  userBubble: {
    backgroundColor: "#6200EE",
    borderBottomRightRadius: wp(1),
  },
  botBubble: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: wp(1),
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  messageText: {
    fontSize: fs(15),
    lineHeight: fs(20),
  },
  userMessageText: {
    color: "#fff",
  },
  botMessageText: {
    color: "#333",
  },
  sourceBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(0.7),
    paddingTop: hp(0.7),
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  sourceText: {
    fontSize: fs(11),
    color: "#666",
    marginLeft: wp(1),
    fontStyle: "italic",
  },
  timestamp: {
    fontSize: fs(10),
    color: "#999",
    marginTop: hp(0.5),
    alignSelf: "flex-end",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
  },
  loadingText: {
    marginLeft: wp(2),
    color: "#666",
    fontSize: fs(14),
  },
  inputContainer: {
    flexDirection: "row",
    padding: wp(3),
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: wp(5),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.2),
    marginRight: wp(2.5),
    maxHeight: hp(12),
    fontSize: fs(15),
  },
  sendButton: {
    width: wp(11.5),
    height: wp(11.5),
    borderRadius: wp(5.75),
    backgroundColor: "#6200EE",
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#E0E0E0",
  },
});

export default ChatScreen;
