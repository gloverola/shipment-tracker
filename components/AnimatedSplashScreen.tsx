import React, { useEffect, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import Logo from "@/assets/icons/logo-small.svg";
import { colors } from "@/constants/Colors";

SplashScreen.preventAutoHideAsync();

export default function AnimatedSplashScreen({ onAnimationFinished }: any) {
  const router = useRouter();
  const [scaleAnim] = useState(new Animated.Value(1));
  const [opacityAnim] = useState(new Animated.Value(1));
  const [bgColorAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bgColorAnim, {
          toValue: 1,
          duration: 1200,
          delay: 100,
          useNativeDriver: false,
        }),
      ]),
      // Fade out the logo
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onAnimationFinished();
      SplashScreen.hideAsync();
    });
  }, []);

  const backgroundColor = bgColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.white, colors.primary],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }}
      >
        <Logo width={200} height={200} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
});
