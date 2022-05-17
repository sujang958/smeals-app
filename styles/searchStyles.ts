import { StyleSheet } from "react-native"
import { BLACK, WHITE } from "./theme"

const SearchStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
    paddingHorizontal: 34,
    paddingVertical: 48,
  },
  header: {
    paddingTop: 52,
  },
  headerTitle: {
    fontSize: 42,
    fontFamily: "PretendardBold",
  },
  headerSearchInputContainer: {
    position: "relative",
    width: "100%",
    marginTop: 24,
  },
  headerSearchInput: {
    borderRadius: 16,
    paddingVertical: 17,
    paddingHorizontal: 20,
    backgroundColor: "#292929",
    color: WHITE,
    fontSize: 20,
    fontFamily: "PretendardMedium",
  },
  headerSearchButton: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    paddingRight: 20,
    paddingLeft: 42,
    justifyContent: "center",
  },
  body: {
    paddingVertical: 28,
    paddingHorizontal: 12,
  },
  schoolItem: {
    paddingVertical: 20,
  },
  schoolItemTitle: {
    fontSize: 22,
    fontFamily: "PretendardMedium",
  },
})

export default SearchStyles
