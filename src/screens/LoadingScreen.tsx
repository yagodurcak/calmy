import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onLoadingComplete,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  const dotAnimations = [
    React.useRef(new Animated.Value(0.3)).current,
    React.useRef(new Animated.Value(0.3)).current,
    React.useRef(new Animated.Value(0.3)).current,
  ];

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        delay: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Dot animations
    dotAnimations.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 1500,
            delay: index * 200,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.3,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    // Complete loading after 2.8 seconds
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={[Colors.background.dark, Colors.background.medium, Colors.background.light]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [
                { scale: scaleAnim },
                { scale: pulseAnim },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoCircle}
          >
            <Ionicons name="heart" size={64} color="white" />
          </LinearGradient>
        </Animated.View>

        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: opacityAnim,
            },
          ]}
        >
          <Text style={styles.title}>Respira</Text>
          <Text style={styles.subtitle}>Tu espacio seguro</Text>
        </Animated.View>

        <View style={styles.loadingContainer}>
          <View style={styles.dotsContainer}>
            {dotAnimations.map((anim, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    opacity: anim,
                    transform: [{ scale: anim }],
                  },
                ]}
              />
            ))}
          </View>
          <Text style={styles.loadingText}>Preparando tu espacio de calma...</Text>
        </View>
      </View>

      <Text style={styles.footerText}>Estás a salvo. Todo va a estar bien.</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  content: {
    alignItems: "center",
    gap: 48,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 20,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "300",
    color: Colors.text.primary,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#a8c5d1",
    fontWeight: "300",
    letterSpacing: 0.5,
  },
  loadingContainer: {
    alignItems: "center",
    gap: 24,
  },
  dotsContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: "center",
    maxWidth: 256,
  },
  footerText: {
    position: "absolute",
    bottom: 48,
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    maxWidth: 320,
    lineHeight: 24,
  },
});
