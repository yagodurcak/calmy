import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

interface ToolCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  gradient: string[];
  onPress: () => void;
  isPremium?: boolean;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  icon,
  title,
  gradient,
  onPress,
  isPremium,
}) => {
  const { width } = useWindowDimensions();
  const containerWidth = Math.min(width - 48, 448); // padding 24*2 = 48, maxWidth 448
  const cardWidth = (containerWidth - 12) / 2; // gap = 12
  
  return (
    <TouchableOpacity
      style={[styles.container, { width: cardWidth }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {isPremium && (
          <View style={styles.premiumBadge}>
            <Ionicons name="lock-closed" size={16} color="white" />
          </View>
        )}
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={32} color="white" />
        </View>
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    aspectRatio: 1,
  },
  gradient: {
    padding: 20,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    width: "100%",
    height: "100%",
    position: "relative",
  },
  premiumBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    flexShrink: 1,
  },
});
