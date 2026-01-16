# Calmy Mobile - App de Manejo de Ansiedad

Aplicación móvil React Native para iOS y Android que ayuda a manejar la ansiedad mediante técnicas científicamente validadas.

## Características

- 🧘 **Ejercicios de Respiración**: Técnica de respiración de caja (4-4-4-4)
- 🌍 **Grounding 5-4-3-2-1**: Técnica de reconexión con el presente
- 🎮 **Juego Calmante**: Actividad interactiva para distracción y calma
- 📝 **Diario de Pensamientos**: Registro estructurado de pensamientos y emociones
- ✍️ **Escritura Expresiva**: Espacio libre para expresar emociones
- 🧠 **Registro TCC**: Análisis estructurado de pensamientos (Terapia Cognitivo Conductual)
- 📚 **Psicoeducación**: Información sobre ansiedad y técnicas de manejo
- 📊 **Monitoreo**: Seguimiento del bienestar emocional

## Tecnologías

- React Native con Expo
- TypeScript
- React Native Reanimated (animaciones)
- React Native Gesture Handler
- Expo Linear Gradient
- React Native Safe Area Context

## Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm start
```

3. Ejecuta en iOS:
```bash
npm run ios
```

4. Ejecuta en Android:
```bash
npm run android
```

## Estructura del Proyecto

```
calmy-mobile/
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── constants/        # Constantes y configuraciones
│   ├── navigation/       # Navegación de la app
│   ├── screens/          # Pantallas principales
│   └── types/            # Tipos TypeScript
├── App.tsx               # Componente principal
└── package.json
```

## Pantallas

- **LoadingScreen**: Pantalla de carga inicial
- **HomeScreen**: Pantalla principal con acceso a todas las herramientas
- **WelcomeGuideScreen**: Guía de bienvenida
- **BreathingExerciseScreen**: Ejercicio de respiración guiado
- **GroundingExerciseScreen**: Ejercicio de grounding 5-4-3-2-1
- **CalmGameScreen**: Juego interactivo calmante
- **ThoughtJournalScreen**: Diario de pensamientos
- **ExpressiveWritingScreen**: Escritura expresiva libre
- **ThoughtRecordScreen**: Registro estructurado TCC
- **ThoughtHistoryScreen**: Historial de registros
- **EducationScreen**: Contenido educativo
- **MonitoringScreen**: Monitoreo de bienestar
- **CompletionScreen**: Pantalla de completado

## Desarrollo

El proyecto está configurado con:
- TypeScript para type safety
- Babel configurado para React Native Reanimated
- Safe Area Context para manejar áreas seguras en iOS/Android

## Notas

- La app está diseñada con un enfoque en la calma y el bienestar
- Todas las técnicas están basadas en evidencia científica
- La interfaz está optimizada para ser calmante y no sobrecargar visualmente

## Licencia

Este proyecto es privado.
