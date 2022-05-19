import { StyleSheet } from "react-native"
import { BLACK, SCREEN_WIDTH, WHITE } from "./theme"

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 172,
    backgroundColor: "#000",
  },
  header: {
    paddingHorizontal: 34,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 44,
    fontFamily: "PretendardBold",
  },
  headerButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    paddingTop: 44,
    paddingBottom: 168,
    flex: 1,
  },
  schoolItem: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: WHITE,
    paddingHorizontal: 24,
    paddingVertical: 25,
  },
  schoolTitleContainer: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  schoolTitle: {
    flex: 1,
    color: BLACK,
    fontSize: 30,
    fontFamily: "PretendardBold",
    flexShrink: 1,
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
    fontSize: 17,
    fontFamily: "PretendardMedium",
  },
  mealItemContentContainer: {
    flexDirection: "row",
    paddingVertical: 8,
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
