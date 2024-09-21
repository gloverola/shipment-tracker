import { colors } from "@/constants/Colors";
import fontSizes from "@/constants/fontSizes";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import ExpandIcon from "@/assets/icons/expand-icon.svg";
import ExpandFocusedIcon from "@/assets/icons/expand-focused.svg";
import CheckedIcon from "@/assets/icons/checkbox-icon.svg";
import CheckedFocusedIcon from "@/assets/icons/checkbox-checked.svg";
import Percel from "@/assets/icons/box.svg";
import ArrowRightIcon from "@/assets/icons/arrow-right-icon.svg";
import PhoneIcon from "@/assets/icons/phone-icon.svg";
import WhatsappIcon from "@/assets/icons/whatsapp-icon.svg";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type ShipmentCardProps = {
  data: any;
};

const ShipmentCard: React.FC<ShipmentCardProps> = ({ data }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [selected, setSelected] = useState<boolean>(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  // Handle card expansion and collapse with animation
  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: collapsed ? 0 : 125,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [collapsed]);

  // Trigger smooth transition for collapse/expand (optional for iOS)
  const toggleCollapse = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCollapsed(!collapsed);
  };

  return (
    <View style={[styles.card, selected && styles.selectedCard]}>
      <View
        style={[
          styles.header,
          !collapsed && {
            borderBottomWidth: 1,
            borderBottomColor: colors?.white,
            borderRadius: 1,
          },
        ]}
      >
        <View style={styles.row}>
          <View style={styles.icon}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setSelected(!selected)}
            >
              {selected ? <CheckedFocusedIcon /> : <CheckedIcon />}
            </TouchableOpacity>
            <View style={styles.shipmentIcon}>
              <Percel />
            </View>
          </View>
          <View style={styles.details}>
            <Text style={styles.route}>AWB</Text>
            <Text style={styles.awb}>{data?.awb}</Text>
            <Text style={styles.route}>
              {data?.origin?.city} <Text style={styles.arrowRight}>→</Text>{" "}
              {data?.destination?.city}
            </Text>
          </View>
          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor:
                  data?.status === "cancelled"
                    ? colors?.ritual_100
                    : colors?.royal_blue_100,
              },
            ]}
          >
            <Text
              style={[
                styles.status,
                {
                  color:
                    data?.status === "cancelled"
                      ? colors?.grayText
                      : colors?.primary,
                },
              ]}
            >
              {data?.status}
            </Text>
          </View>
          <TouchableOpacity
            onPress={toggleCollapse}
            style={collapsed ? styles.expandIcon : styles?.collapsedIcon}
            activeOpacity={0.7}
          >
            {collapsed ? <ExpandIcon /> : <ExpandFocusedIcon />}
          </TouchableOpacity>
        </View>
      </View>

      {/* Collapsible Section (Animated) */}
      <Animated.View
        style={[styles.expandedContent, { height: animatedHeight }]}
      >
        <View style={styles.addressContainer}>
          <View style={styles.addressBlock}>
            <Text style={styles.label}>Origin</Text>
            <Text style={styles.address}>{data?.origin?.address}</Text>
          </View>
          <View style={[styles?.arrowIcon]}>
            {!collapsed && <ArrowRightIcon />}
          </View>
          <View style={styles.addressBlock}>
            <Text style={styles.label}>Destination</Text>
            <Text style={styles.address}>{data?.destination?.address}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <PhoneIcon />
            <Text style={styles.callText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whatsappButton}>
            <WhatsappIcon />
            <Text style={styles.whatsappText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.ritual_500,
    borderRadius: 10,
    marginVertical: 10,
    overflow: "hidden",
    justifyContent: "center",
    padding: 0,
  },
  selectedCard: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  header: {
    padding: 10,
    margin: 0,
    height: 67,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    margin: 0,
  },
  icon: {
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  shipmentIcon: {
    marginLeft: 10,
  },
  details: {
    flex: 1,
  },
  awb: {
    fontWeight: "bold",
    fontSize: fontSizes.medium,
  },
  route: {
    color: colors.grayText,
    fontSize: fontSizes.small,
  },
  arrowRight: {
    color: colors?.primary,
  },
  statusContainer: {
    backgroundColor: colors.royal_blue_100,
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: colors?.white,
  },
  status: {
    color: colors.primary,
    fontSize: fontSizes.small,
    textTransform: "uppercase",
  },
  expandIcon: {
    marginLeft: 10,
    width: 24,
    height: 24,
    backgroundColor: colors.white,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors?.royal_blue_100,
  },
  collapsedIcon: {
    marginLeft: 10,
    width: 24,
    height: 24,
    backgroundColor: colors.primary,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors?.royal_blue_100,
  },
  expandedContent: {
    overflow: "hidden",
    padding: 10,
    height: 125,
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  addressBlock: {
    flex: 1,
  },
  arrowIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    color: colors.black,
  },
  address: {
    color: colors.grayText,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    width: 100,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  callText: {
    color: colors.white,
    fontWeight: "bold",
    marginLeft: 10,
  },
  whatsappButton: {
    backgroundColor: colors.green,
    padding: 10,
    borderRadius: 10,
    width: 142,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  whatsappText: {
    color: colors.white,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default ShipmentCard;
