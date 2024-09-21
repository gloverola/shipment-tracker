import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the shape of our Auth context
type AuthContextType = {
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

// Create the Auth context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if the user is authenticated when the app starts
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async () => {
    await AsyncStorage.setItem("authToken", "mockToken");
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
