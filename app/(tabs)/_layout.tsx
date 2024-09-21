import { Tabs } from "expo-router";
import React, { useContext } from "react";
import { colors } from "@/constants/Colors";
import { AuthContext } from "@/providers/AuthProvider";
import ShipmentIcon from "@/assets/icons/shipment-icon.svg";
import ShipmentFocusedIcon from "@/assets/icons/shipment-focused.svg";
import ScanIcon from "@/assets/icons/scan-icon.svg";
import ScanFocusedIcon from "@/assets/icons/scan-focused.svg";
import WalletIcon from "@/assets/icons/wallet-icon.svg";
import WalletFocusedIcon from "@/assets/icons/wallet-focused.svg";
import ProfileIcon from "@/assets/icons/avatar-icon.svg";
import ProfileFocusedIcon from "@/assets/icons/avatar-focused.svg";

export default function TabLayout() {
  const { isAuthenticated } = useContext(AuthContext) as any;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors?.primary,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="shipments"
        options={{
          title: "Shipments",
          tabBarIcon: ({ focused }) =>
            focused ? <ShipmentFocusedIcon /> : <ShipmentIcon />,
        }}
        redirect={!isAuthenticated}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ focused }) =>
            focused ? <ScanFocusedIcon /> : <ScanIcon />,
        }}
        redirect={!isAuthenticated}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) =>
            focused ? <WalletFocusedIcon /> : <WalletIcon />,
        }}
        redirect={!isAuthenticated}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) =>
            focused ? <ProfileFocusedIcon /> : <ProfileIcon />,
        }}
        redirect={!isAuthenticated}
      />
    </Tabs>
  );
}
