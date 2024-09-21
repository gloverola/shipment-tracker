import { colors } from "@/constants/Colors";
import dimensions from "@/constants/dimensions";
import fontSizes from "@/constants/fontSizes";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
  TextInputProps,
} from "react-native";

type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  onBlur?: () => void;
};

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  onBlur,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current; // Start position depends on whether there's a value

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false, // Important: Font size & color cannot use the native driver
    }).start();
  }, [isFocused, value]);

  // Interpolate the label position, size, and color
  const labelStyle = {
    transform: [
      {
        translateY: animatedLabel.interpolate({
          inputRange: [0, 1],
          outputRange: [10, -5], // Moves label up when focused or filled
        }),
      },
    ],
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [fontSizes.medium, fontSizes.small], // Shrinks label when focused or filled
    }),
    color: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [colors?.inputColor, colors?.inputColor], // Changes color on focus
    }),
  };

  return (
    <View
      style={[
        styles.container,
        isFocused
          ? { borderColor: colors.primary, borderWidth: 1 }
          : { borderColor: colors.inputColor },
      ]}
    >
      {/* Animated Label */}
      <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>

      {/* Input Field */}
      <TextInput
        style={[styles.input]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          onBlur && onBlur();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingVertical: 5,
    position: "relative",
    width: "100%",
    height: 56,
    backgroundColor: colors?.ritual_400,
    borderRadius: dimensions?.borderRadius,
  },
  label: {
    position: "absolute",
    left: dimensions?.padding,
    top: 10,
    fontSize: fontSizes.medium,
    color: colors?.inputColor,
  },
  input: {
    height: "100%",
    paddingHorizontal: dimensions?.padding,
    fontSize: fontSizes.medium,
    color: colors?.primary,
  },
});

export default Input;
