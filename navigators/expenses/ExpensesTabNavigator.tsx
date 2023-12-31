import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import COLORS_STYLE from "../../utils/styles/colors";
import WeekExpensesScreen from "../../screens/expenses/WeekExpensesScreen";
import MonthExpensesScreen from "../../screens/expenses/MonthExpensesScreen";
import YearExpensesScreen from "../../screens/expenses/YearExpensesScreen";

const ExpensesTabNavigator = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: COLORS_STYLE.basicGold },
        tabBarStyle: {
          elevation: 0,
          backgroundColor: COLORS_STYLE.backgroundBlack,
        },
      }}
    >
      <Tab.Screen
        component={WeekExpensesScreen}
        name="weekExpenses"
        options={{
          tabBarLabel: "Tydzień",
          tabBarActiveTintColor: COLORS_STYLE.basicGold,
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: {
            borderColor: "grey",
            borderRadius: 20,
            borderWidth: 2,
            paddingVertical: 5,
            paddingHorizontal: 10,
          },
        }}
      />
      <Tab.Screen
        component={MonthExpensesScreen}
        name="monthExpenses"
        options={{
          tabBarLabel: "Miesiąc",
          tabBarActiveTintColor: COLORS_STYLE.basicGold,
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: {
            borderColor: "grey",
            borderRadius: 20,
            borderWidth: 2,
            paddingVertical: 5,
            paddingHorizontal: 10,
          },
        }}
      />
      <Tab.Screen
        component={YearExpensesScreen}
        name="yearExpenses"
        options={{
          tabBarLabel: "Rok",
          tabBarActiveTintColor: COLORS_STYLE.basicGold,
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: {
            borderColor: "grey",
            borderRadius: 20,
            borderWidth: 2,
            paddingVertical: 5,
            paddingHorizontal: 10,
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default ExpensesTabNavigator;
