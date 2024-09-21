import { useFonts } from "expo-font";
import { Slot, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useState } from "react";
import "react-native-reanimated";
import { AuthContext, AuthProvider } from "@/providers/AuthProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AnimatedSplashScreen from "@/components/AnimatedSplashScreen";

// SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { isAuthenticated } = useContext(AuthContext) as any;
  const router = useRouter();

  useEffect(() => {
    // if (!isLoaded) return;

    if (isAuthenticated) {
      router.replace("/shipments") as any;
    } else if (!isAuthenticated) {
      router.replace("/onboarding");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SF-Pro-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      // SplashScreen.hideAsync();
      setAppReady(true);
    }
  }, [loaded]);

  if (!appReady && !splashAnimationFinished) {
    return (
      <AnimatedSplashScreen
        onAnimationFinished={() => setSplashAnimationFinished(true)}
      />
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <InitialLayout />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
