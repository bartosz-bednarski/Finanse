import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import COLORS_STYLE from "../../utils/styles/colors";
import PlannedExpensesScreen from "../../screens/planning/PlannedExpensesScreen";
import ActualTargetsScreen from "../../screens/planning/ActualTargetsScreen";

const PlanningTabNavigator = () => {
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
        component={PlannedExpensesScreen}
        name="plannedExpenses"
        options={{
          tabBarLabel: "Wydatki",
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
        component={ActualTargetsScreen}
        name="actualTargets"
        options={{
          tabBarLabel: "Cele Finansowe",
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
export default PlanningTabNavigator;
