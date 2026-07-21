import React, { useState } from "react";
import { LoadingScreen } from "../screens/LoadingScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { BreathingExerciseScreen } from "../screens/BreathingExerciseScreen";
import { GroundingExerciseScreen } from "../screens/GroundingExerciseScreen";
import { EducationScreen } from "../screens/EducationScreen";
import { CompletionScreen } from "../screens/CompletionScreen";
import { ScreenPhase } from "../types";

export const AppNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<ScreenPhase>("home");

  const handleNavigate = (screen: ScreenPhase) => {
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    setCurrentScreen("home");
  };

  const handleComplete = () => {
    setCurrentScreen("complete");
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  switch (currentScreen) {
    case "home":
      return <HomeScreen onNavigate={handleNavigate} />;
    case "breathing":
      return (
        <BreathingExerciseScreen
          onComplete={() => handleNavigate("grounding")}
          onBack={handleBack}
        />
      );
    case "grounding":
      return (
        <GroundingExerciseScreen
          onComplete={handleComplete}
          onBack={handleBack}
        />
      );
    case "education":
      return (
        <EducationScreen
          onComplete={handleComplete}
          onBack={handleBack}
        />
      );
    case "complete":
      return <CompletionScreen onReturnHome={handleBack} />;
    default:
      return <HomeScreen onNavigate={handleNavigate} />;
  }
};
