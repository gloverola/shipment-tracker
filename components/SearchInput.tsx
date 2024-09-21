import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";

export default function SearchInput() {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleClearText = () => {
    setSearchText("");
  };

  return (
    <View
      style={[
        styles.searchContainer,
        {
          borderColor: isFocused ? colors.primary : "",
          borderWidth: isFocused ? 1 : 0,
        }, // Change border color based on focus
      ]}
    >
      {/* Search Icon */}
      <Ionicons
        name="search"
        size={20}
        color={isFocused ? colors.primary : colors.inputColor}
        style={styles.searchIcon}
      />

      {/* Search Input */}
      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search"
        placeholderTextColor={colors.inputColor}
        style={styles.searchInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {/* Clear Icon (shown when there is text) */}
      {searchText.length > 0 && (
        <TouchableOpacity onPress={handleClearText}>
          <Ionicons
            name="close"
            size={20}
            color={isFocused ? colors.primary : colors.inputColor}
            style={styles.clearIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    height: 44,
    backgroundColor: colors.ritual_100,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.primary,
  },
  clearIcon: {
    marginLeft: 10,
  },
});
