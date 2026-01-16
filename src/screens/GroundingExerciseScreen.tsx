import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { CalmCharacter } from "../components/CalmCharacter";
import { Colors } from "../constants/colors";
import { groundingSteps } from "../constants/grounding";

interface GroundingExerciseScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  eye: "eye",
  "hand-left": "hand-left",
  ear: "ear",
  cafe: "cafe",
  heart: "heart",
};

export const GroundingExerciseScreen: React.FC<GroundingExerciseScreenProps> = ({
  onComplete,
  onBack,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [itemsFound, setItemsFound] = useState(0);

  const step = groundingSteps[currentStep];
  const IconName = iconMap[step.icon] || "eye";

  const handleNext = () => {
    if (itemsFound < step.count - 1) {
      setItemsFound(itemsFound + 1);
    } else {
      if (currentStep < groundingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
        setItemsFound(0);
      } else {
        onComplete();
      }
    }
  };

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
          {/* Scientific Badge */}
          <View style={styles.badge}>
            <Ionicons name="flask" size={16} color={Colors.primary} />
            <Text style={styles.badgeText}>Técnica validada científicamente</Text>
          </View>

          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>

          {/* Character */}
          <View style={styles.characterContainer}>
            <CalmCharacter size="medium" mood="encouraging" />
          </View>

          {/* Current Step */}
          <View style={styles.stepContainer}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: step.color + "20",
                  borderColor: step.color,
                },
              ]}
            >
              <Ionicons name={IconName} size={48} color={step.color} />
            </View>

            <Text style={styles.promptText}>{step.prompt}</Text>
            <Text style={styles.countText}>
              {itemsFound} de {step.count}
            </Text>
          </View>

          {/* Items List */}
          <View style={styles.itemsContainer}>
            {Array.from({ length: step.count }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.itemCard,
                  index < itemsFound && styles.itemCardCompleted,
                ]}
              >
                <View
                  style={[
                    styles.itemNumber,
                    {
                      backgroundColor:
                        index < itemsFound ? step.color : "rgba(255, 255, 255, 0.1)",
                    },
                  ]}
                >
                  {index < itemsFound ? (
                    <Ionicons name="checkmark" size={20} color="white" />
                  ) : (
                    <Text style={styles.itemNumberText}>{index + 1}</Text>
                  )}
                </View>
                <Text
                  style={[
                    styles.itemText,
                    index < itemsFound && styles.itemTextCompleted,
                  ]}
                >
                  {index < itemsFound ? "Completado" : "Pendiente"}
                </Text>
              </View>
            ))}
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            activeOpacity={0.8}
            disabled={itemsFound >= step.count && currentStep === groundingSteps.length - 1}
          >
            <LinearGradient
              colors={[step.color, step.color + "CC"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.nextButtonGradient}
            >
              <Text style={styles.nextButtonText}>
                {itemsFound < step.count
                  ? "Encontré uno"
                  : currentStep < groundingSteps.length - 1
                  ? "Siguiente"
                  : "Completar"}
              </Text>
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
    gap: 32,
  },
  badge: {
    position: "absolute",
    top: 60,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    backgroundColor: "rgba(107, 158, 219, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(107, 158, 219, 0.3)",
    zIndex: 10,
  },
  badgeText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: "500",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 24,
    padding: 8,
    zIndex: 10,
  },
  characterContainer: {
    marginTop: 60,
  },
  stepContainer: {
    alignItems: "center",
    gap: 16,
    width: "100%",
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
  },
  promptText: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.text.primary,
    textAlign: "center",
    marginTop: 16,
  },
  countText: {
    fontSize: 18,
    color: Colors.text.secondary,
  },
  itemsContainer: {
    width: "100%",
    maxWidth: 400,
    gap: 12,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  itemCardCompleted: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  itemNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  itemNumberText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.secondary,
  },
  itemTextCompleted: {
    color: Colors.text.primary,
    fontWeight: "500",
  },
  nextButton: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonGradient: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});
