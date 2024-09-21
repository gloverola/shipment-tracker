import React, { useCallback, useMemo } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";

type BottomSheetModalProps = {
  sheetRef: React.RefObject<BottomSheet>;
  snapPoint: string[];
  children: React.ReactNode;
  pressBehavior?: "close" | "collapse" | "none";
};

const BottomSheetModal = ({
  sheetRef,
  snapPoint,
  children,
  pressBehavior,
}: BottomSheetModalProps) => {
  const snapPoints = useMemo(() => snapPoint, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={pressBehavior ? pressBehavior : "close"}
        opacity={0.4}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      backgroundStyle={{ borderRadius: 16 }}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      style={styles.container}
    >
      {children}
    </BottomSheet>
  );
};

export default BottomSheetModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    width: "100%",
    zIndex: 100,
  },
});
