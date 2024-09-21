import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ViewStyle } from "react-native";

type SafeAreaProviderComponentProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const SafeAreaProviderComponent: React.FC<SafeAreaProviderComponentProps> = ({
  children,
  style,
}) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[{ flex: 1 }, style]}>{children}</SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SafeAreaProviderComponent;
