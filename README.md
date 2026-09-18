# Workout Logger

Workout Logger is a fitness tracking platform designed for rapid workout logging during intense training sessions. It replaces standard virtual keyboards with an intuitive digit-by-digit vertical slider for recording weights and repetitions. The repository is organized into two primary folders: the web application and the native Android wrapper project.

## Repository Structure

```
workout-logger/
├── Cinematicworkoutlogger/     # React and Vite web client source code
└── android/                    # Capacitor Android native Gradle project
```

The codebase is split into two dedicated directories:
- `Cinematicworkoutlogger`: The React and Vite web client containing the user interface, state management, and gesture input logic.
- `android`: The native Android project powered by Capacitor that packages the web client into an installable Android APK.

---

## 1. Web Application (`Cinematicworkoutlogger`)

### What It Does

The `Cinematicworkoutlogger` folder contains the core web application built with React, TypeScript, Vite, and Tailwind CSS. It provides an interface for logging workout sets, selecting exercises, tracking repetitions, and reviewing chronological session history. The client uses hardware-accelerated animations, responsive touch gesture detection, and local storage persistence via Capacitor Preferences.

### How to Set It Up

Make sure you have Node.js 18 or higher installed on your system before proceeding. Navigate to the web folder, install the required packages, and run the development server.

```bash
# Navigate to the web application directory
cd Cinematicworkoutlogger

# Install dependencies
npm install

# Start the local development server
npm run dev
```

The web application will be accessible at `http://localhost:5173`.

### How to Build for Production

Building the project creates an optimized static asset bundle inside the `dist` directory. This bundle can be hosted on static web servers or synchronized with the Android wrapper.

```bash
# Navigate to the web application directory
cd Cinematicworkoutlogger

# Compile production build
npm run build
```

---

## 2. Android Native Application (`android`)

### What It Is For

The `android` folder contains the native Android wrapper project configured using Capacitor 8. It packages the compiled web application into an installable Android APK, enabling native device capabilities such as tactile haptic feedback and local preference storage. This module allows the app to function as a standalone mobile application without requiring browser navigation bars.

### How to Set It Up and Build the APK

Before compiling the Android project, ensure you have Java Development Kit (JDK) 17 and Android SDK installed. First build the web application, synchronize the web assets into the Android folder, and then compile the APK with Gradle.

```bash
# Step 1: Build web assets and sync to Android
cd Cinematicworkoutlogger
npm run build
npx cap sync android

# Step 2: Navigate to the android directory
cd ../android

# Step 3: Grant executable permissions and compile debug APK
chmod +x ./gradlew
./gradlew assembleDebug
```

### APK Output Location

After the Gradle build completes successfully, the compiled debug APK binary will be available at:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Deployment

The web client can be deployed directly to cloud providers such as Vercel. The `vercel.json` configuration file inside `Cinematicworkoutlogger` is pre-configured to build the frontend and serve the compiled static output automatically.

## License

This project is distributed under the standard project license. Review the LICENSE file in the repository for detailed terms.
