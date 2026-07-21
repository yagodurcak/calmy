import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { ToolCard } from "../components/ToolCard";
import { Colors } from "../constants/colors";
import { ScreenPhase } from "../types";

const BUTTON_SIZE = 240;

interface HomeScreenProps {
  onNavigate: (screen: ScreenPhase) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const buttonPulse = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonPulse, { toValue: 1.06, duration: 1800, useNativeDriver: true }),
        Animated.timing(buttonPulse, { toValue: 1, duration: 1800, useNativeDriver: true }),
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
            <View style={styles.badge}>
              <Ionicons name="flask" size={16} color="#a8e6cf" />
              <Text style={styles.badgeText}>{t("home.badge")}</Text>
              <Ionicons name="trophy" size={16} color="#a8e6cf" />
            </View>
          </View>

          {/* Crisis Button */}
          <View style={styles.crisisButtonContainer}>
            <Animated.View style={{ transform: [{ scale: buttonPulse }] }}>
              <View style={styles.ballWrapper}>
                {/* Dark base — asoma abajo dando efecto 3D */}
                <View style={styles.ballBase} />
                <TouchableOpacity
                  style={styles.crisisButton}
                  onPress={() => onNavigate("breathing")}
                  activeOpacity={0.88}
                >
                  <LinearGradient
                    colors={["#f15134", "#fe2f14"]}
                    start={{ x: 0.3, y: 0 }}
                    end={{ x: 0.7, y: 1 }}
                    style={styles.crisisButtonGradient}
                  >
                    <Text style={styles.crisisButtonText}>{t("home.crisisButton")}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>

          {/* Tools Grid */}
          <View style={styles.toolsGrid}>
            <ToolCard
              icon="leaf"
              title={t("home.tools.breathing")}
              gradient={[Colors.primary, Colors.primaryDark]}
              onPress={() => onNavigate("breathing")}
            />
            <ToolCard
              icon="bulb-outline"
              title={t("home.tools.education")}
              gradient={["#6366f1", "#8b5cf6"]}
              onPress={() => onNavigate("education")}
            />
          </View>

          {/* Prevención */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t("home.prevention")}</Text>
          </View>
          <View style={styles.toolsGrid}>
            <ToolCard
              icon="fitness-outline"
              title={t("home.tools.improvement")}
              gradient={["#1a9e6e", "#0d7a52"]}
              onPress={() => {}}
              isPremium
            />
          </View>

          {/* Footer */}
          <Text style={styles.footerText}>{t("home.footer")}</Text>
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
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  ballWrapper: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE + 14,
    alignItems: "center",
  },
  ballBase: {
    position: "absolute",
    bottom: 0,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: Colors.background.dark,
  },
  crisisButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    overflow: "hidden",
    position: "absolute",
    top: 0,
  },
  crisisButtonGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  crisisButtonText: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    letterSpacing: 4.9,
  },
  crisisSubtitle: {
    marginTop: 20,
    fontSize: 14,
    color: Colors.text.secondary,
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
  sectionHeader: {
    width: "100%",
    maxWidth: 448,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text.primary,
    letterSpacing: -0.3,
  },
  footerText: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: "center",
    marginTop: 32,
  },
});
