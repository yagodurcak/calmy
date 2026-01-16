import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { CalmCharacter } from "../components/CalmCharacter";
import { Colors } from "../constants/colors";
import { breathingSteps } from "../constants/breathing";

interface BreathingExerciseScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export const BreathingExerciseScreen: React.FC<BreathingExerciseScreenProps> = ({
  onComplete,
  onBack,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(breathingSteps[0].duration);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  const step = breathingSteps[currentStep];
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          const nextStep = (currentStep + 1) % breathingSteps.length;
          setCurrentStep(nextStep);

          if (nextStep === 0) {
            const newCycles = cyclesCompleted + 1;
            setCyclesCompleted(newCycles);
          }

          return breathingSteps[nextStep].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStep, cyclesCompleted]);

  useEffect(() => {
    if (cyclesCompleted >= 3) {
      setShowContinue(true);
    }
  }, [cyclesCompleted]);

  useEffect(() => {
    const targetScale = step.phase === "inhala" ? 1.4 : step.phase === "exhala" ? 0.8 : 1.1;
    Animated.spring(scaleAnim, {
      toValue: targetScale,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [currentStep, step.phase]);

  const getCircleColor = () => {
    if (step.phase === "inhala") return Colors.primary;
    if (step.phase === "exhala") return Colors.secondary;
    return Colors.tertiary;
  };

  return (
    <LinearGradient
      colors={[Colors.background.dark, Colors.background.medium, Colors.background.light]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.content}>
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
            <CalmCharacter size="medium" mood="calm" />
          </View>

          {/* Breathing Circle */}
          <View style={styles.circleContainer}>
            <Animated.View
              style={[
                styles.breathingCircle,
                {
                  backgroundColor: getCircleColor(),
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            />
          </View>

          {/* Instructions */}
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionText}>{step.instruction}</Text>
            <Text style={styles.timerText}>{secondsLeft}</Text>
            <Text style={styles.phaseText}>{step.phase.toUpperCase()}</Text>
          </View>

          {/* Cycles Counter */}
          <View style={styles.cyclesContainer}>
            <Text style={styles.cyclesText}>
              Ciclos completados: {cyclesCompleted}
            </Text>
            {showContinue && (
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
                  <Text style={styles.continueButtonText}>Continuar</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </View>
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
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
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
    marginTop: 40,
  },
  circleContainer: {
    width: 280,
    height: 280,
    alignItems: "center",
    justifyContent: "center",
  },
  breathingCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.8,
  },
  instructionsContainer: {
    alignItems: "center",
    gap: 16,
  },
  instructionText: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.text.primary,
    textAlign: "center",
  },
  timerText: {
    fontSize: 64,
    fontWeight: "700",
    color: Colors.primary,
  },
  phaseText: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.text.secondary,
    letterSpacing: 2,
  },
  cyclesContainer: {
    alignItems: "center",
    gap: 16,
  },
  cyclesText: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  continueButton: {
    width: 200,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  continueButtonGradient: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});
