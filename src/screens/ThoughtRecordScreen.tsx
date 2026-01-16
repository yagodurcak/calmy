import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/colors";

interface ThoughtRecordScreenProps {
  onComplete: () => void;
  onBack: () => void;
  onViewHistory?: () => void;
}

export const ThoughtRecordScreen: React.FC<ThoughtRecordScreenProps> = ({
  onComplete,
  onBack,
  onViewHistory,
}) => {
  const [situation, setSituation] = useState("");
  const [thought, setThought] = useState("");
  const [emotion, setEmotion] = useState("");
  const [evidence, setEvidence] = useState("");
  const [alternative, setAlternative] = useState("");

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
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons name="medical" size={24} color="white" />
            </View>
            <Text style={styles.title}>Registro TCC</Text>
            <Text style={styles.subtitle}>
              Analiza tus pensamientos de forma estructurada
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Situación</Text>
              <TextInput
                style={styles.input}
                placeholder="¿Qué situación te afectó?"
                placeholderTextColor={Colors.text.secondary}
                value={situation}
                onChangeText={setSituation}
                multiline
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Pensamiento</Text>
              <TextInput
                style={styles.input}
                placeholder="¿Qué pensaste?"
                placeholderTextColor={Colors.text.secondary}
                value={thought}
                onChangeText={setThought}
                multiline
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Emoción</Text>
              <TextInput
                style={styles.input}
                placeholder="¿Cómo te sentiste?"
                placeholderTextColor={Colors.text.secondary}
                value={emotion}
                onChangeText={setEmotion}
                multiline
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Evidencia</Text>
              <TextInput
                style={styles.input}
                placeholder="¿Qué evidencia apoya este pensamiento?"
                placeholderTextColor={Colors.text.secondary}
                value={evidence}
                onChangeText={setEvidence}
                multiline
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Pensamiento Alternativo</Text>
              <TextInput
                style={styles.input}
                placeholder="¿Hay otra forma de verlo?"
                placeholderTextColor={Colors.text.secondary}
                value={alternative}
                onChangeText={setAlternative}
                multiline
              />
            </View>
          </View>

          <View style={styles.actions}>
            {onViewHistory && (
              <TouchableOpacity
                style={styles.historyButton}
                onPress={onViewHistory}
                activeOpacity={0.8}
              >
                <Ionicons name="time-outline" size={20} color={Colors.text.primary} />
                <Text style={styles.historyButtonText}>Ver Historial</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.completeButton}
              onPress={onComplete}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#a855f7", "#c084fc"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.completeButtonGradient}
              >
                <Text style={styles.completeButtonText}>Guardar</Text>
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
  },
  backButton: {
    marginBottom: 16,
    padding: 8,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    gap: 12,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#a855f7",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: "center",
  },
  form: {
    gap: 24,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  input: {
    minHeight: 80,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    textAlignVertical: "top",
  },
  actions: {
    marginTop: 32,
    gap: 16,
  },
  historyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  historyButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text.primary,
  },
  completeButton: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  completeButtonGradient: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});
