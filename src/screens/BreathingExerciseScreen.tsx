import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { CalmCharacter } from "../components/CalmCharacter";
import { Colors } from "../constants/colors";
import { breathingSteps } from "../constants/breathing";
import { useBreathingAudio } from "../hooks/useBreathingAudio";
import { useBreathingHaptics } from "../hooks/useBreathingHaptics";

const MINIMUM_SECONDS = 120;
const CYCLE_DURATION = breathingSteps.reduce((sum, s) => sum + s.duration, 0);
const TOTAL_CYCLES = Math.ceil(MINIMUM_SECONDS / CYCLE_DURATION);

interface BreathingExerciseScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export const BreathingExerciseScreen: React.FC<BreathingExerciseScreenProps> = ({
  onComplete,
  onBack,
}) => {
  const { t } = useTranslation();
  const [breathingStarted, setBreathingStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(breathingSteps[0].duration);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [showContinue, setShowContinue] = useState(false);
  const [transitionPlaying, setTransitionPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const introSoundRef = useRef<Audio.Sound | null>(null);
  const transitionSoundRef = useRef<Audio.Sound | null>(null);

  // Refs para evitar stale closures en el timer de pasos
  const totalElapsedRef = useRef(0);
  const minimumReachedRef = useRef(false);
  const transitionStartedRef = useRef(false);
  const currentStepRef = useRef(0);
  const secondsLeftRef = useRef(breathingSteps[0].duration);
  const mutedRef = useRef(false);

  const step = breathingSteps[currentStep];
  useBreathingAudio(currentStep, cyclesCompleted, breathingStarted && !transitionPlaying && !muted);
  useBreathingHaptics(currentStep, breathingStarted && !transitionPlaying);

  const toggleMute = () => {
    const next = !muted;
    mutedRef.current = next;
    setMuted(next);
  };
  const scaleAnim = React.useRef(new Animated.Value(0.5)).current;

  // Mantiene el ref sincronizado con el estado
  const setSecondsLeftSync = (val: number) => {
    secondsLeftRef.current = val;
    setSecondsLeft(val);
  };

  // Reproducir intro y luego arrancar la respiración 2s después
  useEffect(() => {
    let delay: ReturnType<typeof setTimeout>;

    async function playIntro() {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/audio/breathing/intro-breath-esp.mp3"),
        { shouldPlay: true }
      );
      introSoundRef.current = sound;
      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded || !status.didJustFinish) return;
        sound.unloadAsync();
        delay = setTimeout(() => setBreathingStarted(true), 2000);
      });
    }

    playIntro();

    return () => {
      clearTimeout(delay);
      introSoundRef.current?.stopAsync().catch(() => {});
      introSoundRef.current?.unloadAsync().catch(() => {});
    };
  }, []);

  // Cleanup del audio de transición al desmontar
  useEffect(() => {
    return () => {
      transitionSoundRef.current?.stopAsync().catch(() => {});
      transitionSoundRef.current?.unloadAsync().catch(() => {});
    };
  }, []);

  // Timer de fases — se pausa durante la transición
  // Usa refs para evitar stale closures sin depender de currentStep
  useEffect(() => {
    if (!breathingStarted || transitionPlaying) return;

    const timer = setInterval(() => {
      totalElapsedRef.current += 1;
      if (totalElapsedRef.current >= MINIMUM_SECONDS) {
        minimumReachedRef.current = true;
      }

      if (secondsLeftRef.current <= 1) {
        // Fin de paso — verificar si hay que lanzar la transición
        if (minimumReachedRef.current && !transitionStartedRef.current) {
          transitionStartedRef.current = true;
          setSecondsLeftSync(0);
          setTransitionPlaying(true);
          return;
        }
        // Avance normal de paso
        const nextStep = (currentStepRef.current + 1) % breathingSteps.length;
        currentStepRef.current = nextStep;
        setCurrentStep(nextStep);
        if (nextStep === 0) setCyclesCompleted((c) => c + 1);
        setSecondsLeftSync(breathingSteps[nextStep].duration);
      } else {
        setSecondsLeftSync(secondsLeftRef.current - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [breathingStarted, transitionPlaying]);

  // Transición: reproduce next-step-esp.mp3 y luego retoma la respiración
  useEffect(() => {
    if (!transitionPlaying) return;

    let cancelled = false;

    async function playTransition() {
      if (mutedRef.current) {
        const nextStep = (currentStepRef.current + 1) % breathingSteps.length;
        currentStepRef.current = nextStep;
        setCurrentStep(nextStep);
        if (nextStep === 0) setCyclesCompleted((c) => c + 1);
        setSecondsLeftSync(breathingSteps[nextStep].duration);
        setShowContinue(true);
        setTransitionPlaying(false);
        return;
      }

      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/audio/breathing/next-step-esp.mp3"),
          { shouldPlay: true }
        );

        if (cancelled) {
          await sound.unloadAsync();
          return;
        }

        transitionSoundRef.current = sound;

        sound.setOnPlaybackStatusUpdate(async (status) => {
          if (!status.isLoaded || !status.didJustFinish) return;
          await sound.unloadAsync().catch(() => {});
          transitionSoundRef.current = null;
          if (cancelled) return;

          // Avanzar al siguiente paso y reanudar la respiración
          const nextStep = (currentStepRef.current + 1) % breathingSteps.length;
          currentStepRef.current = nextStep;
          setCurrentStep(nextStep);
          if (nextStep === 0) setCyclesCompleted((c) => c + 1);
          setSecondsLeftSync(breathingSteps[nextStep].duration);
          setShowContinue(true);
          setTransitionPlaying(false);
        });
      } catch {
        if (!cancelled) {
          setTransitionPlaying(false);
          setShowContinue(true);
        }
      }
    }

    playTransition();

    return () => {
      cancelled = true;
      transitionSoundRef.current?.stopAsync().catch(() => {});
      transitionSoundRef.current?.unloadAsync().catch(() => {});
      transitionSoundRef.current = null;
    };
  }, [transitionPlaying]);

  // Animación — se detiene durante la transición
  useEffect(() => {
    if (!breathingStarted) return;

    if (transitionPlaying) {
      scaleAnim.stopAnimation();
      return;
    }

    if (step.phase === "inhala") {
      Animated.timing(scaleAnim, {
        toValue: 1.4,
        duration: step.duration * 1000,
        useNativeDriver: true,
      }).start();
    } else if (step.phase === "exhala") {
      Animated.timing(scaleAnim, {
        toValue: 0.5,
        duration: step.duration * 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [currentStep, breathingStarted, transitionPlaying]);

  const getCircleColor = () => {
    if (step.phase === "inhala") return "white";
    if (step.phase === "exhala") return "#4A90D9";
    return "#F07820";
  };

  return (
    <LinearGradient
      colors={[Colors.background.dark, Colors.background.medium, Colors.background.light]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.content}>
          {/* Breathing Circle */}
          <View style={styles.circleContainer}>
            <Animated.View
              style={[
                styles.breathingCircle,
                {
                  borderColor: getCircleColor(),
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            />
          </View>

          {/* Instructions */}
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionText}>{t(step.instructionKey)}</Text>
            <Text style={styles.timerText}>{secondsLeft}</Text>
            <Text style={styles.phaseText}>{t(`breathing.phases.${step.phase}`)}</Text>
          </View>

          {/* Cycles Counter */}
          <View style={styles.cyclesContainer}>
            <Text style={styles.cyclesText}>
              {t("breathing.cyclesCompleted", { count: Math.max(0, TOTAL_CYCLES - cyclesCompleted) })}
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
                  <Text style={styles.continueButtonText}>{t("breathing.continue")}</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>

          {/* Back Button — al final para mayor z-order implícito */}
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>

          {/* Mute Button — al final para mayor z-order implícito */}
          <TouchableOpacity
            style={styles.muteButton}
            onPress={toggleMute}
            activeOpacity={0.6}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons
              name={muted ? "volume-mute" : "volume-high"}
              size={32}
              color={muted ? Colors.text.secondary : Colors.text.primary}
            />
          </TouchableOpacity>
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
  muteButton: {
    position: "absolute",
    top: 56,
    right: 20,
    padding: 12,
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
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
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
    color: Colors.text.primary,
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
