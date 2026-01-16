import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/colors";

interface ExpressiveWritingScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export const ExpressiveWritingScreen: React.FC<ExpressiveWritingScreenProps> = ({
  onComplete,
  onBack,
}) => {
  const [text, setText] = useState("");

  return (
    <LinearGradient
      colors={[Colors.background.dark, Colors.background.medium, Colors.background.light]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons name="create-outline" size={24} color="white" />
            </View>
            <Text style={styles.title}>Escritura Expresiva</Text>
            <Text style={styles.subtitle}>
              Escribe libremente sobre lo que sientes
            </Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Escribe aquí tus pensamientos y emociones..."
            placeholderTextColor={Colors.text.secondary}
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={15}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={styles.completeButton}
            onPress={onComplete}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.completeButtonGradient}
            >
              <Text style={styles.completeButtonText}>Guardar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 48,
  },
  backButton: {
    marginBottom: 16,
    padding: 8,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    gap: 12,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#4361ee",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: "center",
  },
  input: {
    minHeight: 300,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 20,
    fontSize: 18,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    textAlignVertical: "top",
    marginBottom: 24,
  },
  completeButton: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  completeButtonGradient: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});
