# Cinematic Workout Logger - Web and Hybrid Client

Cinematic Workout Logger is a minimalist fitness tracking application built for fast, friction-free logging during training sessions. It replaces standard virtual keyboards with an intuitive digit-by-digit vertical slider interface for weight and repetition entry. Lifters can rapidly record sets, track routine progress, and inspect historical performance metrics within a sleek, distraction-free environment.

This directory contains the primary web application source code and the Capacitor bridge configuration. The frontend uses React 18, TypeScript, Vite, and Tailwind CSS for responsive touch interactions and high frame rate animations. It functions as a standalone web application and provides the compiled asset bundle for the native Android build.

## Features

- Gesture-Driven Input Canvas: Vertical digit wheel controls for fast, precise entry of weights and repetitions without system keyboards.
- Guided Logging Sequence: Structured workflow covering exercise naming, weight selection, rep counts, and set confirmation.
- Comprehensive Workout History: Chronological session tracking with detailed breakdowns of exercises, sets, weights, and total volume.
- Native Haptic Feedback: Integrated device vibration cues for tactile confirmation on completed steps and key actions.
- Offline Data Persistence: Client-side storage powered by Capacitor Preferences for instant load times and data privacy.
- Cinematic Dark Interface: Cyberpunk-inspired dark aesthetic featuring dot-matrix backgrounds, glowing status indicators, and smooth state transitions.

## Project Structure

```
CInematicWorkoutLogger/
├── Cinematicworkoutlogger/     # React and Vite web client source
│   ├── src/                    # Application source code
│   │   ├── app/                # Components and main view logic
│   │   ├── services/           # Storage and preference services
│   │   ├── styles/             # Global stylesheets and theme tokens
│   │   └── types/              # TypeScript interfaces
│   ├── dist/                   # Production build distribution folder
│   └── package.json            # Web client dependencies and build scripts
├── capacitor.config.json       # Capacitor native bridge configuration
├── vercel.json                 # Vercel deployment specification
└── package.json                # Root Capacitor tooling dependencies
```

## Setup and Development

### Running the Web Application Locally

Setting up the local development environment requires installing dependencies within the web client directory and starting the Vite development server. This allows you to preview and modify the interface directly in your browser with hot module replacement enabled.

```bash
# Navigate to the web application directory
cd Cinematicworkoutlogger

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Compiling for Production

Compiling the frontend produces optimized static files inside the `dist` directory. These assets are used both for web deployment and for synchronizing with the Capacitor Android project.

```bash
# Navigate to the web application directory
cd Cinematicworkoutlogger

# Build the production bundle
npm run build
```

### Synchronizing Native Assets

After generating the production build, synchronize the web assets and plugins to the native Android directory using Capacitor commands.

```bash
# From the CInematicWorkoutLogger root directory
npx cap sync android
```

## Deployment

This repository is pre-configured for automated deployment on Vercel. The `vercel.json` configuration file automatically targets the `Cinematicworkoutlogger` directory, installs required packages, and serves the generated distribution build.

## License

This project is distributed under the standard project license. Review the LICENSE file in the repository for detailed terms and conditions.
