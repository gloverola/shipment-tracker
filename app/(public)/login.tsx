import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import Input from "@/components/Input";
import dimensions from "@/constants/dimensions";
import Button from "@/components/Button";
import { colors } from "@/constants/Colors";
import BackIcon from "@/assets/icons/chevron-back-icon.svg";
import fontSizes from "@/constants/fontSizes";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "@/providers/AuthProvider";

// Define the validation schema using Zod
const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext) as any;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // Live validation
  });

  const handleLogin = async (data: LoginSchema) => {
    setLoading(true);
    const mockEmail = data?.email;
    const mockPassword = data?.password;

    setTimeout(async () => {
      if (data.email === mockEmail && data.password === mockPassword) {
        setLoading(false);
        await login();
        router.replace("/shipments");
      } else {
        setLoading(false);
        Alert.alert("Login Failed", "Invalid email or password");
      }
    }, 2000); // Simulate a 2-second delay for API request
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.headerContainer}
        activeOpacity={0.7}
        onPress={() => router.back()}
      >
        <BackIcon />
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>

      <View style={styles.subHeaderContainer}>
        <Text style={styles.text}>Login</Text>
        <Text style={styles.subText}>
          Please enter your Username or Email address in order to login
        </Text>
      </View>

      <View style={styles.formContainer}>
        {/* Email Input */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              label="Username / Email"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              onBlur={onBlur}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        {/* Password Input */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              label="Password"
              value={value}
              onChangeText={onChange}
              keyboardType="default"
              secureTextEntry
              onBlur={onBlur}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={loading ? "Logging in..." : "Login"} // Change button text when loading
          onPress={handleSubmit(handleLogin)} // Submit form on button press
          backgroundColor={colors.primary}
          textColor={colors.white}
          disabled={!isValid || loading} // Disable button when form is invalid or during loading
          loading={loading} // Show loading spinner if needed
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: dimensions.padding,
    paddingVertical: dimensions.padding,
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  subHeaderContainer: {
    width: "100%",
    marginVertical: dimensions.margin,
  },
  text: {
    fontSize: fontSizes.xlarge,
    fontWeight: "700",
    marginBottom: dimensions.margin,
  },
  subText: {
    fontSize: fontSizes.medium,
    fontWeight: "400",
    color: colors.grayText,
  },
  cancelText: {
    marginLeft: 5,
    color: colors.primary,
  },
  formContainer: {
    flex: 1,
  },
  buttonContainer: {
    paddingBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: fontSizes.small,
    marginTop: 5,
  },
});
