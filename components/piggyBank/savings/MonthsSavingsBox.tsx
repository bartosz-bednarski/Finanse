import { View, Text, StyleSheet, Pressable } from "react-native";
import COLORS_STYLE from "../../../utils/styles/colors";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const MonthsSavingsBox: React.FC<{
  realised: boolean;
  onPress: () => void;
}> = ({ realised, onPress }) => {
  return (
    <Pressable
      style={styles.goldenContainer}
      onPress={realised ? onPress : null}
    >
      <View style={styles.goldenBox}>
        <View style={styles.goldenBoxTop}>
          <Ionicons name="wallet" size={52} color={COLORS_STYLE.basicGold} />
          <Text style={styles.textWhiteL}>
            {realised
              ? "Zestawienie oszczędności"
              : "Zestawienie dostępne w następnym miesiącu"}
          </Text>
        </View>
        <View style={styles.goldenBoxBottom}>
          {realised && (
            <>
              <Ionicons
                name={"arrow-forward-circle"}
                size={20}
                color={COLORS_STYLE.basicGold}
              />
              <Text style={styles.textWhiteSm}>Przejdź do podsumowania</Text>
            </>
          )}
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  goldenContainer: {
    width: "100%",
    alignItems: "center",
  },
  goldenBox: {
    flexDirection: "column",
    borderColor: COLORS_STYLE.basicGold,
    borderWidth: 1,
    borderRadius: 15,
    width: "100%",
  },
  goldenBoxTop: {
    flexDirection: "row",
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  goldenBoxBottom: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    borderTopColor: COLORS_STYLE.basicGold,
    borderTopWidth: 1,
    alignItems: "center",
  },
  textWhiteL: {
    color: "white",
    fontSize: 16,
    width: "70%",
    fontWeight: "600",
    textAlign: "left",
  },
  textWhiteSm: {
    color: "white",
    fontSize: 14,
  },
});
export default MonthsSavingsBox;
