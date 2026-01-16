import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { CalmCharacter } from "../components/CalmCharacter";
import { Colors } from "../constants/colors";

interface WelcomeGuideScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export const WelcomeGuideScreen: React.FC<WelcomeGuideScreenProps> = ({
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
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>

          {/* Character */}
          <View style={styles.characterContainer}>
            <CalmCharacter
              size="large"
              mood="encouraging"
              message="Estoy aquí para ayudarte"
            />
          </View>

          {/* Welcome Message */}
          <View style={styles.messageContainer}>
            <Text style={styles.title}>Vamos a calmarnos juntos</Text>
            <Text style={styles.description}>
              Te guiaré a través de ejercicios científicamente validados para
              regular tu sistema nervioso.
            </Text>
          </View>

          {/* Scientific Indicators */}
          <View style={styles.indicatorsContainer}>
            <View style={styles.indicatorCard}>
              <View style={[styles.indicatorIcon, { backgroundColor: Colors.primary + "20" }]}>
                <Ionicons name="flask" size={24} color={Colors.primary} />
              </View>
              <View style={styles.indicatorText}>
                <Text style={styles.indicatorTitle}>Respiración de caja</Text>
                <Text style={styles.indicatorDescription}>Activa tu nervio vago</Text>
              </View>
            </View>

            <View style={styles.indicatorCard}>
              <View style={[styles.indicatorIcon, { backgroundColor: Colors.secondary + "20" }]}>
                <Ionicons name="heart" size={24} color={Colors.secondary} />
              </View>
              <View style={styles.indicatorText}>
                <Text style={styles.indicatorTitle}>Técnica 5-4-3-2-1</Text>
                <Text style={styles.indicatorDescription}>Reconexión con el presente</Text>
              </View>
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={onComplete}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.continueButtonGradient}
            >
              <Text style={styles.continueButtonText}>Comenzar</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
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
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 8,
    marginBottom: 24,
  },
  characterContainer: {
    marginBottom: 32,
  },
  messageContainer: {
    alignItems: "center",
    marginBottom: 48,
    maxWidth: 448,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    color: Colors.text.secondary,
    lineHeight: 28,
    textAlign: "center",
  },
  indicatorsContainer: {
    width: "100%",
    maxWidth: 448,
    gap: 12,
    marginBottom: 48,
  },
  indicatorCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  indicatorIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  indicatorText: {
    flex: 1,
  },
  indicatorTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 4,
  },
  indicatorDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  continueButton: {
    width: "100%",
    maxWidth: 448,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  continueButtonGradient: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});
