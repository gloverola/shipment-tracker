import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@/constants/Colors";
import fontSizes from "@/constants/fontSizes";
import dimensions from "@/constants/dimensions";

// Define your filter options
const FILTER_OPTIONS = [
  "Received",
  "Putaway",
  "Delivered",
  "Canceled",
  "Rejected",
  "Lost",
  "On Hold",
];

export default function FilterComponent({
  onClose,
  onApply,
}: {
  onClose: () => void;
  onApply: (selectedFilters: string[]) => void;
}) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Toggle filter selection
  const toggleFilter = (filter: string) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.headerText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Filters</Text>
        <TouchableOpacity onPress={() => onApply(selectedFilters)}>
          <Text style={styles.headerText}>Done</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>SHIPMENT STATUS</Text>
      <View style={styles.filtersContainer}>
        {FILTER_OPTIONS.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilters.includes(filter) && styles.filterButtonSelected, // Apply selected styles
            ]}
            onPress={() => toggleFilter(filter)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedFilters.includes(filter) &&
                  styles.filterButtonTextSelected,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,

    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: dimensions.margin,
    borderBottomWidth: 1,
    borderBottomColor: colors?.ritual_100,
    padding: dimensions.padding,
  },
  headerText: {
    fontSize: fontSizes.medium,
    color: colors.primary,
    fontWeight: "600",
  },
  title: {
    fontSize: fontSizes.large,
    fontWeight: "bold",
    color: colors.black,
  },
  sectionTitle: {
    fontSize: fontSizes.medium,
    color: colors.grayText,
    marginBottom: dimensions.margin,
    paddingHorizontal: dimensions.padding,
  },
  filtersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: dimensions.padding,
  },
  filterButton: {
    backgroundColor: colors.ritual_100,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
    marginBottom: 10,
  },
  filterButtonSelected: {
    borderColor: colors.primary,
  },
  filterButtonText: {
    fontSize: fontSizes.medium,
    color: colors.grayText,
  },
  filterButtonTextSelected: {
    color: colors.primary,
  },
});
