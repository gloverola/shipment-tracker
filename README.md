# Shippex React Native App

This is a React Native app built with **Expo** that features functionalities such as a **splash screen**, **login screen**, and a **main screen** with a **bottom tab navigation**. The main screen includes **Shipments**, **Scan**, **Wallet**, and **Profile** pages.

The project uses the latest **Expo technology** with **Yarn** as the package manager and **TypeScript** for type safety.

## 🚀 Features

- **Animated Splash Screen** using `expo-splash-screen` and `react-native-reanimated`
- **Authentication** screen using `react-hook-form` and `zod` for validation
- A main screen with a **bottom tab navigator** containing:
  - **Shipments** screen with filtering options
  - **Scan** and **Wallet** screens
  - **Profile** screen
- Reusable components like **Buttons**, **Input Fields**, **Shipment Cards**, **Filter Modals**, etc.
- State management for user authentication and filtering using **AsyncStorage** and React hooks
- The app works seamlessly on both **iOS** and **Android** using Expo Go.

## 📦 Packages Used

- **Expo**: Core framework to develop the app
- **React Navigation**: For navigation, using Expo Router
- **React Native Reanimated**: For smooth animations
- **React-Hook-Form** & **Zod**: For form handling and validation
- **@gorhom/bottom-sheet**: For the bottom sheet functionality
- **@shopify/flash-list**: High-performance list for rendering shipment data

## 🛠 Prerequisites

- **Node.js** and **Yarn** installed
- **Expo CLI** installed globally:
  ```bash
  npm install -g expo-cli
  ```
- iOS or Android device with **Expo Go** app installed (Available on the App Store and Google Play)

## 📝 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gloverola/shipment-tracker
   cd ShippexReactNative
   ```

2. Install dependencies using Yarn:

   ```bash
   yarn install
   ```

## 🚀 Running the App

1. Start the Expo development server:

   ```bash
   yarn start
   ```

2. After the server starts, you'll see a QR code in your terminal or the browser window.

### For iOS

- Open the **Expo Go** app on your iPhone.
- Scan the QR code using the camera. The app will automatically open in **Expo Go**.

### For Android

- Open the **Expo Go** app on your Android device.
- Scan the QR code using the built-in scanner, and the app will launch.

### Running on an Emulator

- **iOS Emulator**: Press `i` in the Expo server terminal to open the app in an iOS simulator (requires Xcode).
- **Android Emulator**: Press `a` to open it on an Android emulator (requires Android Studio).

## 📚 Project Structure

```
/assets             # Contains images, icons, and fonts
/components         # Reusable components (Buttons, Input, etc.)
/constants          # Constants for colors, dimensions, etc.
/app            # Main screens for the app (Login, Shipments, Profile, etc.)
/providers          # Context and providers for global state management
/utils              # Utility functions and mock data (e.g., shipmentData)
```

### Main Screens

- `Login`: Authentication with form validation.
- `Shipments`: List of shipments with filter options.

### Key Components

- **AnimatedSplashScreen**: Displays the splash screen with a scaling animation
- **FilterComponent**: A modal with multiple filter options
- **ShipmentCard**: Displays shipment details with a collapsible feature
- **SearchInput**: Custom search input field with animated placeholder

## 🧪 Testing the App

- Test the app directly using **Expo Go** on your device or simulator/emulator.

## 📋 Common Commands

- **Start the project**: `yarn start`
- **Run on iOS simulator**: Press `i` in the Expo terminal
- **Run on Android emulator**: Press `a` in the Expo terminal
- **Build production app**: Follow Expo's [build documentation](https://docs.expo.dev/distribution/building-standalone-apps/)

## ⚡ Useful Tips

- If you encounter the error **"Error: TapGestureHandler must be used as a descendant of GestureHandlerRootView"**, ensure you've wrapped your app in `<GestureHandlerRootView>` in the main entry file.
- To resolve the **Reanimated** plugin version mismatch, update `react-native-reanimated` and restart the project.

## 🐞 Troubleshooting

- **Error: Mismatch between JavaScript code version and Reanimated Babel plugin version**:
  - Run `yarn add react-native-reanimated@latest` and restart the server with `expo r -c`.
- **FlashList’s size warning**:

## 🔗 Useful Links

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Navigation](https://reactnavigation.org/docs/getting-started/)
- [Bottom Sheet by Gorhom](https://gorhom.github.io/react-native-bottom-sheet/)

## 👨‍💻 Contributors

- **Olaoluwa Glover**

---

```

```
