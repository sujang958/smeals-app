import { Dimensions, StyleSheet } from "react-native"

export const SCREEN_WIDTH = Dimensions.get("screen").width
export const SCREEN_HEIGHT = Dimensions.get("screen").height

export const BLACK = "#000"
export const WHITE = "#fff"

export const BaseTextStyles = StyleSheet.create({
  text: {
    fontFamily: "PretendardRegular",
    color: WHITE,
  },
}).text
