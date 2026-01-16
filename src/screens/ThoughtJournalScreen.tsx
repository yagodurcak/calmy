import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/colors";
import { journalSteps } from "../constants/journal";

interface ThoughtJournalScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export const ThoughtJournalScreen: React.FC<ThoughtJournalScreenProps> = ({
  onComplete,
  onBack,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [entries, setEntries] = useState(["", "", ""]);

  const step = journalSteps[currentStep];

  const handleNext = () => {
    if (currentStep < journalSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleChange = (value: string) => {
    const newEntries = [...entries];
    newEntries[currentStep] = value;
    setEntries(newEntries);
  };

  const canProceed = entries[currentStep].trim().length > 0;

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
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handlePrevious}>
              <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <View style={styles.iconContainer}>
                <Ionicons name="book" size={24} color="white" />
              </View>
              <View>
                <Text style={styles.headerTitle}>Diario de Pensamientos</Text>
                <Text style={styles.headerSubtitle}>
                  Paso {currentStep + 1} de {journalSteps.length}
                </Text>
              </View>
            </View>
          </View>

          {/* Step Content */}
          <View style={styles.content}>
            <Text style={styles.label}>{step.label}</Text>
            <Text style={styles.hint}>{step.hint}</Text>

            <TextInput
              style={styles.input}
              placeholder={step.placeholder}
              placeholderTextColor={Colors.text.secondary}
              value={entries[currentStep]}
              onChangeText={handleChange}
              multiline
              numberOfLines={8}
              textAlignVertical="top"
            />
          </View>

          {/* Navigation */}
          <View style={styles.navigation}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={handlePrevious}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={20} color={Colors.text.primary} />
              <Text style={styles.navButtonText}>Atrás</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.nextButton, !canProceed && styles.nextButtonDisabled]}
              onPress={handleNext}
              activeOpacity={0.8}
              disabled={!canProceed}
            >
              <LinearGradient
                colors={canProceed ? [Colors.tertiary, Colors.primary] : ["#666", "#666"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.nextButtonGradient}
              >
                <Text style={styles.nextButtonText}>
                  {currentStep < journalSteps.length - 1 ? "Siguiente" : "Completar"}
                </Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
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
    flexGrow: 1,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    marginBottom: 16,
    padding: 8,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.tertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  content: {
    flex: 1,
    gap: 16,
  },
  label: {
    fontSize: 28,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  hint: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  input: {
    flex: 1,
    minHeight: 200,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 20,
    fontSize: 18,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    textAlignVertical: "top",
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 32,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 16,
  },
  navButtonText: {
    fontSize: 16,
    color: Colors.text.primary,
    fontWeight: "500",
  },
  nextButton: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonGradient: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});
