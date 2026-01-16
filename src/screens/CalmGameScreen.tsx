import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/colors";

interface Block {
  id: number;
  x: number;
  color: string;
}

interface CalmGameScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

const calmColors = Colors.calmColors;

export const CalmGameScreen: React.FC<CalmGameScreenProps> = ({
  onComplete,
  onBack,
}) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState("Toca para comenzar");

  const gridCols = 5;
  const blockId = useCallback(() => Math.floor(Math.random() * 10000), []);

  const addBlock = useCallback(() => {
    const newBlock: Block = {
      id: blockId(),
      x: Math.floor(Math.random() * gridCols),
      color: calmColors[Math.floor(Math.random() * calmColors.length)],
    };
    setBlocks((prev) => [...prev, newBlock]);
  }, [blockId]);

  const removeBlock = (id: number) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    setScore((prev) => {
      const newScore = prev + 1;
      if (newScore > 0 && newScore % 5 === 0) {
        const encouragements = [
          "Lo estás haciendo muy bien",
          "Excelente trabajo",
          "Sigue así",
          "Estás presente",
          "Muy bien",
        ];
        setMessage(encouragements[Math.floor(Math.random() * encouragements.length)]);
        setTimeout(() => setMessage("Toca los bloques con calma"), 2000);
      }
      return newScore;
    });
  };

  const handleStart = () => {
    setIsPlaying(true);
    setScore(0);
    setBlocks([]);
    setMessage("Toca los bloques con calma");
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      addBlock();
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying, addBlock]);

  return (
    <LinearGradient
      colors={[Colors.background.dark, Colors.background.medium, Colors.background.light]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Ionicons name="star" size={24} color={Colors.primary} />
              <Text style={styles.title}>Juego de Calma</Text>
            </View>
            <Text style={styles.message}>{message}</Text>
            {isPlaying && <Text style={styles.score}>{score}</Text>}
          </View>

          {/* Game Area */}
          <View style={styles.gameArea}>
            {!isPlaying && score === 0 && (
              <TouchableOpacity
                style={styles.startButton}
                onPress={handleStart}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[Colors.primary, Colors.primaryDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.startButtonGradient}
                >
                  <Ionicons name="play" size={48} color="white" />
                  <Text style={styles.startButtonText}>Comenzar</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}

            {isPlaying && (
              <View style={styles.grid}>
                {Array.from({ length: gridCols * 4 }).map((_, index) => {
                  const col = index % gridCols;
                  const row = Math.floor(index / gridCols);
                  const block = blocks.find((b) => b.x === col);
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.gridCell}
                      onPress={() => block && removeBlock(block.id)}
                      activeOpacity={0.7}
                    >
                      {block && (
                        <View
                          style={[
                            styles.block,
                            {
                              backgroundColor: block.color,
                            },
                          ]}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {isPlaying && score >= 20 && (
              <TouchableOpacity
                style={styles.completeButton}
                onPress={onComplete}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[Colors.success, Colors.secondary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.completeButtonGradient}
                >
                  <Text style={styles.completeButtonText}>Completar</Text>
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
    padding: 24,
    gap: 24,
  },
  header: {
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 0,
    padding: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  message: {
    fontSize: 18,
    color: Colors.text.secondary,
    textAlign: "center",
  },
  score: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.primary,
  },
  gameArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  startButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 16,
  },
  startButtonGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: 300,
    gap: 8,
  },
  gridCell: {
    width: "18%",
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  block: {
    width: "80%",
    height: "80%",
    borderRadius: 8,
  },
  completeButton: {
    marginTop: 32,
    width: 200,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  completeButtonGradient: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});
