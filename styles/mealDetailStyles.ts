import { StyleSheet } from "react-native"
import { WHITE } from "./theme"

const MealDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 116,
    paddingBottom: 36,
    paddingHorizontal: 32,
    backgroundColor: "#000",
  },
  header: {
    paddingVertical: 14,
  },
  headerTitle: {
    fontSize: 42,
    fontFamily: "PretendardBold",
  },
  headerTitle2: {
    paddingVertical: 4,
    fontSize: 36,
    fontFamily: "PretendardMedium",
  },
  body: {
    paddingVertical: 42,
    paddingHorizontal: 10,
  },
  dateTitle: {
    fontSize: 24,
    fontFamily: "PretendardMedium",
  },
  mealItem: {
    paddingVertical: 14,
  },
  mealDishContainer: {
    paddingVertical: 2,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  mealItemTitle: {
    fontSize: 20,
    fontFamily: "PretendardMedium",
    paddingTop: 6,
    paddingBottom: 8,
  },
  mealItemDish: {
    fontSize: 18,
    marginRight: 4,
  },
})

export default MealDetailStyles
