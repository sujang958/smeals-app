import { StyleSheet } from "react-native"
import { BLACK, WHITE } from "./theme"

const MealDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 82,
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
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  androidDatePicker: {
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 6,
    backgroundColor: "#333",
    alignSelf: "flex-end",
  },
  dateTitle: {
    fontSize: 24,
    fontFamily: "PretendardMedium",
  },
  mealItem: {
    paddingVertical: 16,
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
