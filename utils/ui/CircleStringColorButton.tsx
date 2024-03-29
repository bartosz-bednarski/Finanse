import { Pressable, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS_STYLE from "../styles/colors";
import pieChartColors from "../styles/pieChartColors";

const CircleStringColorButton: React.FC<{
  iconName: string | undefined;
  name: string;
  color: number;
  catId: string;
  onPressHandler: () => void;
}> = ({ iconName, name, color, catId, onPressHandler }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.box, { borderColor: pieChartColors[color] }]}
        onPress={onPressHandler}
      >
        <Ionicons name={iconName} size={50} color={pieChartColors[color]} />
      </Pressable>
      <Text style={styles.value}>{name}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 140,
    width: 80,
  },
  box: {
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS_STYLE.backgroundBlack,
    borderWidth: 2,
    borderRadius: 50,
    height: 80,
    width: 80,
    marginVertical: 5,
    elevation: 10,
    shadowColor: "black",
  },
  value: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    width: 90,
    height: 40,
  },
});
export default CircleStringColorButton;
