import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";

interface CalmCharacterProps {
  size?: "small" | "medium" | "large";
  mood?: "encouraging" | "celebrating" | "calm";
  message?: string;
}

export const CalmCharacter: React.FC<CalmCharacterProps> = ({
  size = "medium",
  mood = "calm",
  message,
}) => {
  const sizeMap = {
    small: 60,
    medium: 100,
    large: 140,
  };

  const iconSize = sizeMap[size];

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.circle,
          {
            width: iconSize,
            height: iconSize,
            borderRadius: iconSize / 2,
          },
        ]}
      >
        <Ionicons
          name="heart"
          size={iconSize * 0.5}
          color={Colors.primary}
          style={styles.icon}
        />
      </View>
      {message && (
        <Text style={styles.message}>{message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    backgroundColor: "rgba(107, 158, 219, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  icon: {
    marginTop: 4,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.text.primary,
    textAlign: "center",
    fontWeight: "500",
  },
});
