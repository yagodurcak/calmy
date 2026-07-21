import { useEffect, useRef } from "react";
import * as Haptics from "expo-haptics";

export function useBreathingHaptics(currentStep: number, started: boolean) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearAll() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutsRef.current.forEach(clearTimeout);
    intervalRef.current = null;
    timeoutsRef.current = [];
  }

  useEffect(() => {
    if (!started) return;
    clearAll();

    // step 0 — inhala: dos pulsos cortos y seguidos
    if (currentStep === 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const t = setTimeout(
        () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
        350
      );
      timeoutsRef.current.push(t);
    }

    // step 2 — exhala: pulsos frecuentes que van bajando de intensidad
    if (currentStep === 2) {
      const pattern: { delay: number; style: Haptics.ImpactFeedbackStyle }[] = [
        { delay: 0,    style: Haptics.ImpactFeedbackStyle.Heavy },
        { delay: 600,  style: Haptics.ImpactFeedbackStyle.Heavy },
        { delay: 1200, style: Haptics.ImpactFeedbackStyle.Medium },
        { delay: 1900, style: Haptics.ImpactFeedbackStyle.Medium },
        { delay: 2700, style: Haptics.ImpactFeedbackStyle.Light },
        { delay: 3500, style: Haptics.ImpactFeedbackStyle.Light },
      ];
      pattern.forEach(({ delay, style }) => {
        const t = setTimeout(() => Haptics.impactAsync(style), delay);
        timeoutsRef.current.push(t);
      });
    }

    // step 1 (sostén) y step 3 (pausa): sin háptica

    return clearAll;
  }, [currentStep, started]);

  // Cleanup al desmontar
  useEffect(() => () => clearAll(), []);
}
