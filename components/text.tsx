import { FC } from "react"
import { Text as RNText, TextStyle } from "react-native"
import { BaseTextStyles } from "../styles/theme"

const Text: FC<{ children: any; style?: TextStyle }> = ({
  children,
  style,
}) => {
  return <RNText style={{ ...BaseTextStyles, ...style }}>{children}</RNText>
}

export default Text
