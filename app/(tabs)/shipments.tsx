import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import dimensions from "@/constants/dimensions";
import fontSizes from "@/constants/fontSizes";
import ShippexLogo from "@/assets/icons/logo-full2.svg";
import ProfileImage from "@/assets/icons/profile.svg";
import BellIcon from "@/assets/icons/bell-icon.svg";
import FilterIcon from "@/assets/icons/filter-icon.svg";
import ScanIcon from "@/assets/icons/scan-icon2.svg";
import { colors } from "@/constants/Colors";
import SafeAreaProviderComponent from "@/providers/SafeAreaProvider";
import SearchInput from "@/components/SearchInput";
import { SHIPMENT_DATA } from "@/utils/shipmentData";
import ShipmentCard from "@/components/ShipmentCard";
import CheckedIcon from "@/assets/icons/checkbox-icon.svg";
import FilterComponent from "@/components/Filter";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import BottomSheetModal from "@/components/BottomSheet";
import { StatusBar } from "expo-status-bar";

export default function Shipments() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const openFilterModal = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  // Close the filter modal
  const closeFilterModal = () => {
    bottomSheetRef.current?.close();
  };

  const applyFilters = (filters: string[]) => {
    setSelectedFilters(filters);
    closeFilterModal();
  };

  return (
    <SafeAreaProviderComponent style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.avatarContainer}>
        {/* Header */}
        <View style={styles.header}>
          <ProfileImage />
          <ShippexLogo />
          <TouchableOpacity style={styles.notificationIcon}>
            <BellIcon />
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <Text style={styles.greetingText}>Hello,</Text>
        <Text style={styles.usernameText}>Olaoluwa Glover</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchInput />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={openFilterModal}
          >
            <FilterIcon />
            <Text style={styles.buttonText}>Filters</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addScanButton}>
            <ScanIcon />
            <Text style={styles.addScanText}>Add Scan</Text>
          </TouchableOpacity>
        </View>

        {/* List */}
        <View style={styles.shipmentContainer}>
          <View style={styles.shipmentList}>
            <Text style={styles.shipmentText}>Shipments</Text>
            <TouchableOpacity style={styles.markBtn}>
              <CheckedIcon />
              <Text style={styles.markText}>Mark All</Text>
            </TouchableOpacity>
          </View>
          <FlashList
            data={SHIPMENT_DATA}
            renderItem={({ item }) => <ShipmentCard data={item} />}
            estimatedItemSize={100}
            keyExtractor={(item) => item.awb}
            contentContainerStyle={styles.flashList}
          />
        </View>
      </View>

      <BottomSheetModal sheetRef={bottomSheetRef} snapPoint={["45%"]}>
        <FilterComponent onClose={closeFilterModal} onApply={applyFilters} />
      </BottomSheetModal>
    </SafeAreaProviderComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors?.white,
    paddingHorizontal: dimensions.padding,
  },
  flashList: {},
  avatarContainer: {
    paddingTop: dimensions.padding,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    padding: 8,
    backgroundColor: colors.ritual_100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  greetingText: {
    fontSize: fontSizes.medium,
    color: colors.grayText,
  },
  usernameText: {
    fontSize: fontSizes.large,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 20,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSizes.medium,
    color: colors.primary,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterButton: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.ritual_100,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    marginRight: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  buttonText: {
    marginLeft: 8,
    fontSize: fontSizes.medium,
    color: colors.grayText,
  },
  addScanButton: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  addScanText: {
    marginLeft: 8,
    fontSize: fontSizes.medium,
    color: colors.white,
  },

  shipmentContainer: {
    marginTop: 40,
    width: "100%",
    height: "100%",
  },
  shipmentList: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  shipmentText: {
    fontSize: fontSizes.large,
    fontWeight: "bold",
  },

  markBtn: {
    flexDirection: "row",
    alignItems: "center",
  },

  markText: {
    marginLeft: 5,
    fontSize: 18,
    color: colors.primary,
  },
});
