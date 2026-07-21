import { useEffect, useRef } from "react";
import { Audio } from "expo-av";

const INHALE_AUDIO = [
  require("../../assets/audio/breathing/inhale-esp.mp3"),   // ciclo 1
  require("../../assets/audio/breathing/inhale-esp-2.mp3"), // ciclo 2+
];

const PHASE_AUDIO = [
  null, // step 0 — inhala: se resuelve dinámicamente según ciclo
  require("../../assets/audio/breathing/hold-esp.mp3"),
  require("../../assets/audio/breathing/exhale-esp.mp3"),
  require("../../assets/audio/breathing/pause-esp.mp3"),
];

export function useBreathingAudio(currentStep: number, cyclesCompleted: number, started: boolean) {
  const soundRef = useRef<Audio.Sound | null>(null);

  // Activar audio en modo silencio iOS — crítico para app de pánico
  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  }, []);

  // Cleanup al desmontar la pantalla
  useEffect(() => {
    return () => {
      soundRef.current?.stopAsync().catch(() => {});
      soundRef.current?.unloadAsync().catch(() => {});
    };
  }, []);

  useEffect(() => {
    if (!started) return;
    let cancelled = false;

    async function play() {
      // Detener y liberar el audio anterior
      if (soundRef.current) {
        await soundRef.current.stopAsync().catch(() => {});
        await soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
      }
      if (cancelled) return;

      const source =
        currentStep === 0
          ? INHALE_AUDIO[cyclesCompleted === 0 ? 0 : 1]
          : PHASE_AUDIO[currentStep];

      const { sound } = await Audio.Sound.createAsync(source, {
        shouldPlay: true,
      });

      if (cancelled) {
        await sound.unloadAsync();
        return;
      }
      soundRef.current = sound;

      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          await sound.unloadAsync().catch(() => {});
        }
      });
    }

    play();

    return () => {
      cancelled = true;
      soundRef.current?.stopAsync().catch(() => {});
      soundRef.current?.unloadAsync().catch(() => {});
      soundRef.current = null;
    };
  }, [currentStep, cyclesCompleted, started]);
}
