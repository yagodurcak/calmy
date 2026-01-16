import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ToolCard } from "../components/ToolCard";
import { Colors } from "../constants/colors";
import { ScreenPhase } from "../types";

interface HomeScreenProps {
  onNavigate: (screen: ScreenPhase) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <LinearGradient
      colors={[Colors.background.dark, Colors.background.medium, Colors.background.light]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Calmy</Text>
            <View style={styles.badge}>
              <Ionicons name="flask" size={16} color="#a8e6cf" />
              <Text style={styles.badgeText}>Técnicas validadas científicamente</Text>
              <Ionicons name="trophy" size={16} color="#a8e6cf" />
            </View>
          </View>

          {/* Crisis Button */}
          <View style={styles.crisisButtonContainer}>
            <Animated.View
              style={[
                styles.pulseRing,
                {
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            />
            <TouchableOpacity
              style={styles.crisisButton}
              onPress={() => onNavigate("welcome-guide")}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[Colors.primary, Colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.crisisButtonGradient}
              >
                <Animated.View
                  style={[
                    styles.heartContainer,
                    {
                      transform: [{ scale: pulseAnim }],
                    },
                  ]}
                >
                  <Ionicons name="heart" size={80} color="white" />
                </Animated.View>
                <Text style={styles.crisisButtonText}>Necesito calmarme</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Tools Grid */}
          <View style={styles.toolsGrid}>
            <ToolCard
              icon="leaf"
              title="Respiración"
              gradient={[Colors.primary, Colors.primaryDark]}
              onPress={() => onNavigate("breathing")}
            />
            <ToolCard
              icon="create-outline"
              title="Escritura Expresiva"
              gradient={["#4361ee", "#3b82f6"]}
              onPress={() => onNavigate("expressive-writing")}
              isPremium
            />
            <ToolCard
              icon="anchor"
              title="Grounding"
              gradient={["#7ba8d9", "#6b9edb"]}
              onPress={() => onNavigate("grounding")}
            />
            <ToolCard
              icon="medical"
              title="Registro TCC"
              gradient={["#a855f7", "#c084fc"]}
              onPress={() => onNavigate("thought-record")}
              isPremium
            />
            <ToolCard
              icon="time-outline"
              title="Historial TCC"
              gradient={["#7bc7a7", "#a3dbc4"]}
              onPress={() => onNavigate("thought-history")}
            />
            <ToolCard
              icon="bulb-outline"
              title="Psicoeducación"
              gradient={["#6366f1", "#8b5cf6"]}
              onPress={() => onNavigate("education")}
              isPremium
            />
            <ToolCard
              icon="game-controller"
              title="Juego Calmante"
              gradient={["#8bb4dd", "#7ba8d9"]}
              onPress={() => onNavigate("game")}
            />
            <ToolCard
              icon="book"
              title="Diario"
              gradient={[Colors.primary, Colors.primaryDark]}
              onPress={() => onNavigate("journal")}
            />
            <ToolCard
              icon="pulse-outline"
              title="Monitoreo"
              gradient={["#3b82f6", "#6366f1"]}
              onPress={() => onNavigate("monitoring")}
              isPremium
            />
          </View>

          {/* Footer */}
          <Text style={styles.footerText}>Estás a salvo. Todo va a estar bien.</Text>
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 48,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 32,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: Colors.text.primary,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  badgeText: {
    fontSize: 12,
    color: "#a8e6cf",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  crisisButtonContainer: {
    marginBottom: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  pulseRing: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    borderWidth: 4,
    borderColor: "rgba(107, 158, 219, 0.4)",
  },
  crisisButton: {
    width: 288,
    height: 288,
    borderRadius: 144,
    overflow: "hidden",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 20,
  },
  crisisButtonGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
  },
  heartContainer: {
    marginBottom: 16,
  },
  crisisButtonText: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
  toolsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: 448,
    marginBottom: 32,
    gap: 12,
  },
  footerText: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: "center",
    marginTop: 32,
  },
});
