export type ScreenPhase =
  | "home"
  | "welcome-guide"
  | "breathing"
  | "grounding"
  | "game"
  | "journal"
  | "expressive-writing"
  | "thought-record"
  | "thought-history"
  | "education"
  | "monitoring"
  | "complete";

export interface NavigationProps {
  navigation: {
    navigate: (screen: ScreenPhase) => void;
    goBack: () => void;
  };
}

export interface ScreenProps {
  onComplete?: () => void;
  onBack?: () => void;
  onViewHistory?: () => void;
  onReturnHome?: () => void;
}
