# Cinematic Workout Logger


Cinematic Workout Logger is a minimalist fitness tracking application built for fast, friction-free logging during training sessions. It replaces standard virtual keyboards with an intuitive digit-by-digit vertical slider interface for weight and repetition entry. Lifters can rapidly record sets, track routine progress, and inspect historical performance metrics within a sleek, distraction-free environment.

The platform consists of a responsive web client and a native Android application wrapped with Capacitor. React, TypeScript, and Vite drive the core frontend with hardware-accelerated animations and touch controls. Capacitor bridges the web build to Android, providing offline data storage and tactile haptic feedback.

## Features

- Gesture-Driven Input Canvas: Vertical digit wheel controls for fast, precise entry of weights and repetitions without bringing up system keyboards.
- Guided Step-by-Step Flow: Structured sequence covering exercise naming, weight selection, rep counts, and set confirmation.
- Comprehensive Workout History: Chronological session tracking with detailed breakdowns of exercises, sets, weights, and total volume.
- Native Haptic Feedback: Integrated device vibration cues for tactile confirmation on completed steps and key actions.
- Offline Data Persistence: Client-side storage powered by Capacitor Preferences for instant load times and data privacy.
- Cinematic Dark Interface: Cyberpunk-inspired dark aesthetic featuring dot-matrix backgrounds, glowing status indicators, and smooth state transitions.

## Architecture and Project Structure

```
workout-logger/
├── Cinematicworkoutlogger/                 # React and Vite web client source
│   ├── src/                                # Application source code
│   │   ├── app/                            # Components and main view logic
│   │   ├── services/                       # Storage and persistence services
│   │   ├── styles/                         # Global styles and Tailwind configuration
│   │   └── types/                          # TypeScript data models
│   ├── capacitor.config.json               # Capacitor bridge configuration
│   ├── vercel.json                         # Vercel deployment configuration
│   ├── dist/                               # Compiled production web assets
│   └── package.json                        # Web and Capacitor dependencies
└── android/                                # Android native Gradle project
    ├── app/                                # Android application module and manifest
    └── gradlew                             # Gradle wrapper executable script
```

## Technology Stack

- Frontend Framework: React 18 with TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS
- Animation and Interactions: Motion and hardware-accelerated CSS transforms
- Mobile Bridge: Capacitor 8
- Native Storage: Capacitor Preferences API
- UI Components and Icons: Radix UI, Lucide React, Sonner Toaster
- Native Platform: Android SDK with Gradle

## Prerequisites

- Node.js version 18.x or higher installed on your development machine
- npm package manager version 9.x or higher
- Java Development Kit (JDK) 17 or higher (for Android builds)
- Android SDK and platform tools configured in your environment (for Android builds)
- Android Studio (optional, for visual native inspection and device deployment)

## Setup and Installation

### 1. Web Application Setup

Setting up the web application requires installing dependencies within the web client directory and starting the Vite development server. This allows you to preview and modify the interface directly in your browser with hot module replacement enabled.

```bash
# Navigate to the web application directory
cd Cinematicworkoutlogger

# Install project dependencies
npm install

# Start the local development server
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### 2. Building the Web Application for Production

Compiling the frontend produces optimized static files inside the `dist` directory. These assets are used both for web deployment and for synchronizing with the Capacitor Android project.

```bash
# Navigate to the web application directory
cd Cinematicworkoutlogger

# Generate the production build
npm run build
```

### 3. Synchronizing with Capacitor

After compiling the web application, synchronize the built assets to the native Android directory using Capacitor CLI commands directly from the web client directory.

```bash
# Navigate to the web application directory
cd Cinematicworkoutlogger

# Sync web assets and plugins to the native Android project
npx cap sync android
```

### 4. Building the Android APK

The native Android project is compiled using the Gradle wrapper included in the repository. Ensure your Android SDK and Java environment variables are properly set before initiating the build process.

```bash
# Navigate to the Android native directory
cd android

# Ensure execute permissions on the wrapper script
chmod +x ./gradlew

# Build a debug APK
./gradlew assembleDebug
```

Upon successful compilation, the resulting debug APK binary will be available at:
`android/app/build/outputs/apk/debug/app-debug.apk`

## Data Storage and Persistence

All workout sessions, sets, and exercise data are managed locally on the user device via the Capacitor Preferences API. This ensures full data privacy and enables complete offline functionality without requiring an internet connection or external user authentication.

## Deployment

The web client includes configuration for instant deployment on static hosting providers such as Vercel. The `vercel.json` file inside `Cinematicworkoutlogger` is pre-configured to build the client and serve the resulting `dist` bundle.

## License

This project is distributed under the standard project license. Review the LICENSE file in the repository for detailed terms and conditions.
