# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Calmy — Contexto del Proyecto

## ¿Qué es Calmy?

App móvil (React Native + Expo) **exclusivamente orientada a ataques de pánico y crisis de ansiedad aguda** — no es una app de bienestar general ni meditación. El usuario en pleno ataque presiona un gran botón central "Necesito calmarme" y la app lo guía a través de una secuencia de técnicas con respaldo científico hasta salir de la crisis.

> **Foco de producto:** ataques de pánico / ansiedad aguda. Todo lo que se construya debe tener sentido en ese contexto de emergencia emocional, no en el uso cotidiano de "mejorar mi bienestar".

## Comandos de desarrollo

```bash
npx expo start          # Inicia Metro bundler (escanear QR con Expo Go)
npx expo start --ios    # Abre en simulador iOS
npx expo start --android # Abre en emulador Android
npx expo start --web    # Abre en navegador (funcionalidad limitada)
```

No hay linter configurado ni test runner — TypeScript strict mode es la única verificación estática (`tsc --noEmit` funciona pero no está en scripts).

## Stack técnico

- **React Native 0.81.5** con **Expo ~54** (New Architecture habilitada: `newArchEnabled: true`)
- **TypeScript** estricto (`"strict": true`, extiende `expo/tsconfig.base`)
- **react-native-reanimated ^4** — requiere el plugin de Babel en `babel.config.js` (ya configurado)
- **react-native-gesture-handler ^2** — requiere `GestureHandlerRootView` en la raíz (ya en `App.tsx`)
- **expo-linear-gradient ^15** para fondos degradados
- **@react-navigation/stack ^7** (instalado pero sin uso — navegación es manual via switch/state)
- **react-native-svg ^15** (instalado, no usado aún)

## Arquitectura de navegación

La navegación **no usa React Navigation** — usa un switch custom en `src/navigation/AppNavigator.tsx` con `useState<ScreenPhase>`. Esto es intencional: el flujo de crisis es lineal y no necesita stack history.

El tipo `ScreenPhase` y la interfaz `ScreenProps` están centralizados en `src/types/index.ts`. Toda pantalla recibe `onComplete`, `onBack` y callbacks similares como props.

**Flujo de crisis (único flujo secuencial):**
```
loading → home → welcome-guide → breathing → grounding → game → journal → complete
```

**Rutas laterales desde home** (todas terminan en `complete`):
- `expressive-writing`
- `thought-record` → `thought-history`
- `education`
- `monitoring`

**Para agregar una pantalla nueva:**
1. Agregar la clave al tipo `ScreenPhase` en `src/types/index.ts`
2. Agregar el `case` en el switch de `AppNavigator.tsx`
3. Agregar navegación desde `HomeScreen` si corresponde

## Estructura de providers (App.tsx)

```
<SafeAreaProvider>           ← react-native-safe-area-context
  <GestureHandlerRootView>   ← requerido por react-native-gesture-handler
    <StatusBar style="light" />
    <AppNavigator />
  </GestureHandlerRootView>
</SafeAreaProvider>
```

No hay context providers de tema ni estado global — los colores se consumen directamente desde `Colors`.

## Pantallas y su propósito científico

| Screen | Técnica | Evidencia |
|---|---|---|
| `WelcomeGuideScreen` | Orientación inicial | Psicoeducación básica |
| `BreathingExerciseScreen` | Respiración de caja 4-4-4-4 | Activa SNP, reduce cortisol |
| `GroundingExerciseScreen` | Grounding 5-4-3-2-1 | TCC: reconexión sensorial con el presente |
| `CalmGameScreen` | Juego de bloques minimalista | Distracción cognitiva controlada |
| `ThoughtJournalScreen` | Diario guiado (Pensamiento→Emoción→Perspectiva) | TCC básico |
| `ExpressiveWritingScreen` | Escritura libre | Pennebaker Method |
| `ThoughtRecordScreen` | Registro TCC estructurado (5 campos) | TCC clásica |
| `ThoughtHistoryScreen` | Historial de registros TCC | Seguimiento longitudinal |
| `EducationScreen` | Psicoeducación sobre ansiedad | Psicoeducación como intervención |
| `MonitoringScreen` | Monitoreo de bienestar (stub) | EMA |
| `CompletionScreen` | Cierre positivo | Refuerzo positivo conductual |

## Constantes de dominio

- `src/constants/colors.ts` — paleta `Colors` (única fuente de colores, fondo oscuro `#0f2027`)
- `src/constants/breathing.ts` — configuración de la técnica de respiración
- `src/constants/grounding.ts` — prompts del ejercicio 5-4-3-2-1
- `src/constants/journal.ts` — prompts del diario guiado

## Componentes reutilizables

- `CalmCharacter` — avatar de corazón con moods (`calm` / `encouraging` / `celebrating`)
- `ToolCard` — tarjeta del grid del Home; `isPremium` es visual only, sin lógica de paywall

## Convenciones de código

- Todos los textos en **español**
- Cada pantalla tiene su propio `StyleSheet.create` al final del archivo
- Colores siempre desde `Colors` de `src/constants/colors.ts`
- `LinearGradient` con `Colors.background.dark/medium/light` como fondo estándar
- Siempre `SafeAreaView` con `edges={["top"]}` o `edges={["top","bottom"]}`
- Botón de volver: `TouchableOpacity` con `Ionicons name="arrow-back"` en `position: absolute, top: 60, left: 24`

## Estado actual y gaps conocidos

- **Sin persistencia**: ThoughtRecord y ExpressiveWriting no guardan nada. ThoughtHistory está vacía. No hay AsyncStorage ni SQLite instalados.
- **MonitoringScreen es un stub**: solo muestra un placeholder.
- **ToolCard.isPremium** es visual — no hay paywall ni autenticación.
- **react-navigation/stack** instalado pero sin uso — pendiente decidir si migrar.
- **react-native-svg** instalada pero sin uso todavía.

## Próximas features probables

- Persistencia local (AsyncStorage o SQLite) para journal y TCC history
- MonitoringScreen con gráfico de estados de ánimo
- Animaciones más ricas con react-native-reanimated (Animated API básica en uso hoy)
- Personajes con SVG (`react-native-svg` ya instalado)
