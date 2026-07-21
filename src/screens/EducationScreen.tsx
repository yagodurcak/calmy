import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { Colors } from "../constants/colors";

interface EducationScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export const EducationScreen: React.FC<EducationScreenProps> = ({
  onComplete,
  onBack,
}) => {
  const { t } = useTranslation();
  const topics = t("education.topics", { returnObjects: true }) as { title: string; content: string }[];
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
              <Ionicons name="bulb-outline" size={24} color="white" />
            </View>
            <Text style={styles.title}>{t("education.title")}</Text>
            <Text style={styles.subtitle}>{t("education.subtitle")}</Text>
          </View>

          <View style={styles.topicsContainer}>
            {topics.map((topic, index) => (
              <View key={index} style={styles.topicCard}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicContent}>{topic.content}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.completeButton}
            onPress={onComplete}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#6366f1", "#8b5cf6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.completeButtonGradient}
            >
              <Text style={styles.completeButtonText}>{t("education.continue")}</Text>
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
    backgroundColor: "#6366f1",
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
  topicsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  topicCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  topicTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 12,
  },
  topicContent: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  completeButton: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#6366f1",
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
