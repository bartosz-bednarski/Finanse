import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import COLORS_STYLE from "../../utils/styles/colors";
import YearSummaryStrip from "./YearSummaryStrip";
import randomId from "../../utils/randomIdFunction";
import { MONTHS } from "../../utils/months";
import { numberWithSpaces } from "../../utils/numberWithSpaces";

const MonthSummaryBox: React.FC<{
  data: {
    month: number;
    currency: {
      currency: string;
      sumOfExpenses: number;
      sumOfIncomes: number;
    }[];
  };
}> = ({ data }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.box}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <View style={styles.mainBox}>
          <Ionicons
            name="calendar"
            color={"white"}
            size={48}
            style={{ marginLeft: 10 }}
          />
          <Text style={styles.monthName}>{MONTHS[data.month]}</Text>
          <View style={styles.details}>
            {data.currency.map((item) => {
              return (
                <View style={styles.rowBox} key={randomId()}>
                  <Text
                    style={[
                      styles.value,
                      {
                        color:
                          Number(item.sumOfIncomes) -
                            Number(item.sumOfExpenses) >
                          0
                            ? COLORS_STYLE.green
                            : COLORS_STYLE.red,
                      },
                    ]}
                  >
                    {Number(item.sumOfIncomes) - Number(item.sumOfExpenses) >= 0
                      ? "+"
                      : "-"}
                  </Text>
                  <Text
                    style={[
                      styles.value,
                      {
                        color:
                          Number(item.sumOfIncomes) -
                            Number(item.sumOfExpenses) >
                          0
                            ? COLORS_STYLE.green
                            : COLORS_STYLE.red,
                      },
                    ]}
                  >
                    {numberWithSpaces(
                      Math.abs(
                        Number(
                          (
                            Number(item.sumOfIncomes) -
                            Number(item.sumOfExpenses)
                          ).toFixed(2)
                        )
                      )
                    )}
                  </Text>
                  <Text
                    style={[styles.value, { color: COLORS_STYLE.basicGold }]}
                  >
                    {item.currency}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        {showDropdown &&
          data.currency.map((item) => (
            <View key={randomId()}>
              <YearSummaryStrip
                name="Przychody"
                currency={item.currency}
                value={item.sumOfIncomes}
              />
              <YearSummaryStrip
                name="Wydatki"
                currency={item.currency}
                value={item.sumOfExpenses}
              />
            </View>
          ))}

        <View style={styles.dropdownButton}>
          <Ionicons
            name={showDropdown ? "caret-up" : "caret-down"}
            color={COLORS_STYLE.tabGrey}
            size={20}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
  },
  box: {
    paddingTop: 10,
    paddingBottom: 0,
    borderRadius: 15,
    width: "100%",
    backgroundColor: COLORS_STYLE.tabGrey,
    borderColor: COLORS_STYLE.basicGold,
    borderWidth: 1,
  },
  monthName: {
    fontSize: 20,
    color: "white",
    marginLeft: 5,
    width: "30%",
  },
  mainBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    width: "100%",
    marginBottom: 5,
  },

  details: {
    width: "43%",
  },
  rowBox: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  value: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "600",
    marginRight: 5,
  },
  dropdownButton: {
    marginTop: 5,
    marginVertical: 0,
    height: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS_STYLE.basicGold,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: COLORS_STYLE.basicGold,
  },
});
export default MonthSummaryBox;
