import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import COLORS_STYLE from "../../utils/styles/colors";
import { useEffect } from "react";
import pieChartColors from "../../utils/styles/pieChartColors";
import SingleExpense from "../../components/expenses/SingleExpense";
import { CategoriesExpensesWithNames } from "../../types/expenses";
import CustomButton from "../../utils/ui/CustomButton";
import { Navigation } from "../../types/global";
import PieChartWithFrames from "../../components/expenses/PieChartWithFrames";
import StripsColumn from "../../utils/ui/StripsColumn";
import PieChartRealisation from "../../components/expenses/PieChartRealisation";
import AddCircleButton from "../../utils/ui/AddCircleButton";

const WeekExpensesScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const categories = useAppSelector(
    (state) => state.expensesCategories.categoriesList
  );
  const categoriesExpenses = useAppSelector(
    (state) => state.expenses.weekCategoriesExpenses
  );
  const plannedExpenses = useAppSelector(
    (state) => state.expenses.plannedExpenses
  );
  const bankAccountStatus = useAppSelector(
    (state) => state.piggyBank.bankAccountStatus
  );
  const categoriesExpensesWithNames: CategoriesExpensesWithNames =
    categoriesExpenses.map((category, index) => ({
      ...category,
      color: pieChartColors[index],
      ...categories.find((item) => item.catId === category.catId),
    }));
  const lastExpenses = useAppSelector((state) => state.expenses.weekExpenses);
  const lastExpensesToShow = lastExpenses.map((item) => ({
    ...item,
    ...categories.find((cat) => cat.catId === item.catId),
    iconColorNumber: categories.findIndex((cat) => cat.catId === item.catId),
  }));
  let stripsColumnData = categoriesExpenses.map((category) => ({
    ...category,
    ...plannedExpenses.find((item) => item.catId === category.catId),
  }));

  const sumOfPlannedExpenses = plannedExpenses
    .map((item) => Number(item.value))
    .reduce((partialSum, a) => partialSum + a, 0);
  const sumOfAllExpenses = categoriesExpenses
    .map((cat) => Number(cat.sum))
    .reduce((partialSum, a) => partialSum + a, 0);
  const toSpend = sumOfPlannedExpenses - sumOfAllExpenses;
  useEffect(() => {
    stripsColumnData = categoriesExpenses.map((category) => ({
      ...category,
      ...plannedExpenses.find((item) => item.catId === category.catId),
    }));
  }, [plannedExpenses, categoriesExpenses]);
  return (
    <>
      <View style={styles.container}>
        {bankAccountStatus === 0 && (
          <View style={styles.buttonBox}>
            <CustomButton
              title="Uzupełnij stan konta"
              onPress={() => navigation.navigate("Oszczędności")}
            />
          </View>
        )}
        {bankAccountStatus > 0 && (
          <ScrollView style={styles.scrollView}>
            {sumOfAllExpenses > 0 && (
              <>
                <PieChartWithFrames
                  categoriesExpensesWithNames={categoriesExpensesWithNames}
                  sumOfAllExpenses={sumOfAllExpenses}
                  toSpend={toSpend}
                />
                <Text style={styles.label}>
                  Realizacja wydatków w poszczególnych kategoriach
                </Text>
                <StripsColumn data={stripsColumnData} />
                <Text style={styles.label}>Realizacja założeń wydatków</Text>
                <PieChartRealisation
                  realExpenses={sumOfAllExpenses}
                  plannedExpenses={sumOfPlannedExpenses}
                />
              </>
            )}
            {lastExpensesToShow.length > 0 && (
              <>
                <Text style={styles.label}>Lista ostatnich wydatków</Text>
                <View style={styles.lastExpensesContainer}>
                  {lastExpensesToShow.map((item) => {
                    if (item.value !== 0) {
                      return (
                        <SingleExpense
                          iconName={item.iconName!}
                          price={item.value}
                          date={item.dateString}
                          key={item.id}
                          color={item.iconColorNumber}
                          name={item.name}
                        />
                      );
                    }
                  })}
                </View>
              </>
            )}
          </ScrollView>
        )}
        {bankAccountStatus > 0 && (
          <AddCircleButton
            onPress={() => navigation.navigate("addExpense")}
            name="Dodaj wydatek"
          />
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  informationBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  scrollView: {
    flex: 9,
  },
  buttonBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  sumOfExpenses: {
    fontSize: 30,
    fontWeight: "600",
    color: "white",
    marginVertical: 10,
  },
  label: {
    color: COLORS_STYLE.labelGrey,
    fontSize: 10,
    marginVertical: 10,
  },
  whiteText: {
    color: "white",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    marginVertical: 10,
  },

  globalRealistationPieChart: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 200,
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 10,
  },
  categoryExpenseBox: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    height: "auto",
    justifyContent: "center",
  },
  lastExpensesContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    gap: 5,
  },
});
export default WeekExpensesScreen;
