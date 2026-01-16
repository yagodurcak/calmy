import React, { useState } from "react";
import { LoadingScreen } from "../screens/LoadingScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { WelcomeGuideScreen } from "../screens/WelcomeGuideScreen";
import { BreathingExerciseScreen } from "../screens/BreathingExerciseScreen";
import { GroundingExerciseScreen } from "../screens/GroundingExerciseScreen";
import { CalmGameScreen } from "../screens/CalmGameScreen";
import { ThoughtJournalScreen } from "../screens/ThoughtJournalScreen";
import { ExpressiveWritingScreen } from "../screens/ExpressiveWritingScreen";
import { ThoughtRecordScreen } from "../screens/ThoughtRecordScreen";
import { ThoughtHistoryScreen } from "../screens/ThoughtHistoryScreen";
import { EducationScreen } from "../screens/EducationScreen";
import { MonitoringScreen } from "../screens/MonitoringScreen";
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
    case "welcome-guide":
      return (
        <WelcomeGuideScreen
          onComplete={() => handleNavigate("breathing")}
          onBack={handleBack}
        />
      );
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
          onComplete={() => handleNavigate("game")}
          onBack={handleBack}
        />
      );
    case "game":
      return (
        <CalmGameScreen
          onComplete={() => handleNavigate("journal")}
          onBack={handleBack}
        />
      );
    case "journal":
      return (
        <ThoughtJournalScreen
          onComplete={handleComplete}
          onBack={handleBack}
        />
      );
    case "expressive-writing":
      return (
        <ExpressiveWritingScreen
          onComplete={handleComplete}
          onBack={handleBack}
        />
      );
    case "thought-record":
      return (
        <ThoughtRecordScreen
          onComplete={handleComplete}
          onBack={handleBack}
          onViewHistory={() => handleNavigate("thought-history")}
        />
      );
    case "thought-history":
      return <ThoughtHistoryScreen onBack={handleBack} />;
    case "education":
      return (
        <EducationScreen
          onComplete={handleComplete}
          onBack={handleBack}
        />
      );
    case "monitoring":
      return (
        <MonitoringScreen
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
