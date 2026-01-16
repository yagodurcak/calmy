import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/colors";

interface ThoughtHistoryScreenProps {
  onBack: () => void;
}

export const ThoughtHistoryScreen: React.FC<ThoughtHistoryScreenProps> = ({
  onBack,
}) => {
  // Mock data - en producción vendría de un estado o base de datos
  const records: any[] = [];

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
              <Ionicons name="time-outline" size={24} color="white" />
            </View>
            <Text style={styles.title}>Historial TCC</Text>
            <Text style={styles.subtitle}>
              Tus registros de pensamientos anteriores
            </Text>
          </View>

          {records.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="document-text-outline" size={64} color={Colors.text.secondary} />
              <Text style={styles.emptyText}>No hay registros aún</Text>
              <Text style={styles.emptySubtext}>
                Comienza creando tu primer registro de pensamientos
              </Text>
            </View>
          ) : (
            <View style={styles.recordsContainer}>
              {records.map((record, index) => (
                <View key={index} style={styles.recordCard}>
                  <Text style={styles.recordDate}>{record.date}</Text>
                  <Text style={styles.recordSituation}>{record.situation}</Text>
                </View>
              ))}
            </View>
          )}
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
    backgroundColor: "#7bc7a7",
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
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 48,
    gap: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  emptySubtext: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: "center",
  },
  recordsContainer: {
    gap: 16,
  },
  recordCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  recordDate: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  recordSituation: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.text.primary,
  },
});
