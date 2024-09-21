import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import Logo from '@/assets/icons/logo-small.svg';
import { colors } from '@/constants/Colors';


// Prevent the splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

export default function SplashScreenComponent() {
  const router = useRouter();
  const [scaleAnim] = useState(new Animated.Value(1)); // Initial scale is 1
  const [opacityAnim] = useState(new Animated.Value(1)); // Initial opacity is 1
  const [bgColorAnim] = useState(new Animated.Value(0)); // 0 is white, 1 is blue

  useEffect(() => {
    // Start the animation sequence
    Animated.sequence([
      // Scale the logo to cover the full screen
      Animated.timing(scaleAnim, {
        toValue: 10, // Scale the logo to a very large size (10x)
        duration: 2000,
        useNativeDriver: true,
      }),
      // Fade out the logo
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      // Change background color to blue
      Animated.timing(bgColorAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start(() => {
      SplashScreen.hideAsync(); // Hide the splash screen
      router.push('/onboarding' as any); // Navigate to the Onboarding screen
    });
  }, []);

  // Interpolate the background color from white to blue
  const backgroundColor = bgColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors?.white, colors?.primary], // White to Blue transition
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors?.white
  },
});
