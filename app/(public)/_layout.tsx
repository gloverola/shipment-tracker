import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack>
  );
};

export default PublicLayout;
