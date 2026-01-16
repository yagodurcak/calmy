import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { CalmCharacter } from "../components/CalmCharacter";
import { Colors } from "../constants/colors";

interface CompletionScreenProps {
  onReturnHome: () => void;
}

const affirmations = [
  "Has hecho un gran trabajo",
  "Enfrentaste tu malestar con valentía",
  "Cada vez que practicas, te vuelves más fuerte",
];

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  onReturnHome,
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
          {/* Character */}
          <View style={styles.characterContainer}>
            <CalmCharacter size="large" mood="celebrating" />
          </View>

          {/* Success Message */}
          <View style={styles.messageContainer}>
            <View style={styles.checkContainer}>
              <Ionicons name="checkmark-circle" size={80} color={Colors.success} />
            </View>
            <Text style={styles.title}>Lo lograste</Text>
            <Text style={styles.description}>
              Has completado los ejercicios de regulación emocional.
            </Text>
            <Text style={styles.subDescription}>
              Estás más presente ahora. Tu sistema nervioso se está calmando.
            </Text>
          </View>

          {/* Affirmations */}
          <View style={styles.affirmationsContainer}>
            {affirmations.map((affirmation, idx) => (
              <View key={idx} style={styles.affirmationCard}>
                <Text style={styles.affirmationText}>{affirmation}</Text>
              </View>
            ))}
          </View>

          {/* Return Home Button */}
          <TouchableOpacity
            style={styles.homeButton}
            onPress={onReturnHome}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.homeButtonGradient}
            >
              <Ionicons name="home" size={24} color="white" />
              <Text style={styles.homeButtonText}>Volver al inicio</Text>
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
    gap: 48,
  },
  characterContainer: {
    marginTop: 32,
  },
  messageContainer: {
    alignItems: "center",
    gap: 16,
    maxWidth: 448,
  },
  checkContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e5f8ef",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: Colors.text.primary,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 28,
  },
  subDescription: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
  },
  affirmationsContainer: {
    width: "100%",
    maxWidth: 448,
    gap: 12,
  },
  affirmationCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  affirmationText: {
    fontSize: 16,
    color: Colors.text.primary,
    textAlign: "center",
    lineHeight: 24,
  },
  homeButton: {
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
  homeButtonGradient: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});
