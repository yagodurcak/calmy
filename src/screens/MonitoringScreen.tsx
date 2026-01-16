import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/colors";

interface MonitoringScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export const MonitoringScreen: React.FC<MonitoringScreenProps> = ({
  onComplete,
  onBack,
}) => {
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
              <Ionicons name="pulse-outline" size={24} color="white" />
            </View>
            <Text style={styles.title}>Monitoreo</Text>
            <Text style={styles.subtitle}>
              Registra y monitorea tu bienestar emocional
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Ionicons name="bar-chart-outline" size={64} color={Colors.text.secondary} />
            <Text style={styles.infoText}>
              Esta función te permitirá llevar un registro de tu estado emocional
              a lo largo del tiempo y visualizar tu progreso.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.completeButton}
            onPress={onComplete}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#3b82f6", "#6366f1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.completeButtonGradient}
            >
              <Text style={styles.completeButtonText}>Continuar</Text>
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
    backgroundColor: "#3b82f6",
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
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 48,
    gap: 24,
  },
  infoText: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
  },
  completeButton: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#3b82f6",
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
