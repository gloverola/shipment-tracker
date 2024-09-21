import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  loading?: boolean;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  backgroundColor = '#0000ff', // Default to blue
  textColor = '#ffffff', // Default to white
  loading = false,
  disabled = false,
}) => {
  // Determine button styles based on backgroundColor
  const buttonStyle: ViewStyle = {
    backgroundColor: disabled ? 'rgba(0, 0, 0, 0.1)' : backgroundColor,
  };

  // Determine text styles based on textColor
  const textStyle: TextStyle = {
    color: disabled ? '#cccccc' : textColor,
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled || loading} // Disable button when loading or disabled
    >
      {loading ? (
        <ActivityIndicator color={textColor} /> // Show loading indicator
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    width: "100%",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontWeight: '700',
    fontSize: 17,
  },
});

export default Button;
