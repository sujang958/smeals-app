import { Dimensions, StyleSheet } from "react-native"
import { BLACK, WHITE } from "./theme"

const SCREEN_WIDTH = Dimensions.get("screen").width
const SCREEN_HEIGHT = Dimensions.get("screen").height

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 132,
    backgroundColor: "#000",
  },
  header: {
    paddingHorizontal: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 44,
    fontFamily: "PretendardBold",
  },
  plusText: {
    fontSize: 48,
    fontFamily: "PretendardMedium",
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
  },
  schoolContainer: {
    width: SCREEN_WIDTH,
    height: "100%",
    paddingHorizontal: 34,
    paddingTop: 96,
    paddingBottom: 178,
    flex: 1,
  },
  schoolItem: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: WHITE,
    paddingHorizontal: 24,
    paddingVertical: 25,
  },
  schoolTitle: {
    flex: 1,
    color: BLACK,
    fontSize: 30,
    fontFamily: "PretendardBold",
  },
  mealContainer: {
    flex: 8,
    paddingVertical: 8,
  },
  mealTitle: {
    color: BLACK,
    fontSize: 20,
    fontFamily: "PretendardMedium",
  },
  mealItem: {
    flex: 1,
    paddingVertical: 22,
  },
  mealItemTitle: {
    color: BLACK,
    fontSize: 17.2,
    fontFamily: "PretendardMedium",
  },
  mealItemContentContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    flexWrap: "wrap",
    alignItems: "center",
  },
  mealItemContentText: {
    color: BLACK,
    fontSize: 17,
    marginLeft: 4,
  },
})

export default HomeStyles
