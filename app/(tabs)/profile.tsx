import Button from "@/components/Button";
import { AuthContext } from "@/providers/AuthProvider";
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Profile() {
  const { logout } = useContext(AuthContext) as any;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <Button title="Logout" onPress={logout}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
