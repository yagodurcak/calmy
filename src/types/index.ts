export type ScreenPhase =
  | "home"
  | "breathing"
  | "grounding"
  | "education"
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
  onReturnHome?: () => void;
}
