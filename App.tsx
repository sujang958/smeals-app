import { NavigationContainer } from "@react-navigation/native"
import "react-native-gesture-handler"
import HomeScreen from "./screens/homet"
import { loadAsync } from "expo-font"
import { ActivityIndicator, View } from "react-native"
import { BLACK } from "./styles/theme"
import { useEffect, useState } from "react"
import { createStackNavigator } from "@react-navigation/stack"

const RootStack = createStackNavigator()

export default function App() {
  const [isLoading, setLoading] = useState(true)
  const getFont = async () => {
    await loadAsync({
      PretendardBold: require("./assets/fonts/Pretendard-Bold.otf"),
      PretendardLight: require("./assets/fonts/Pretendard-Light.otf"),
      PretendardMedium: require("./assets/fonts/Pretendard-Medium.otf"),
      PretendardRegular: require("./assets/fonts/Pretendard-Regular.otf"),
    })
  }
  const loadAssets = async () => {
    await getFont()
  }

  useEffect(() => {
    loadAssets().then(() => setLoading(false))
  }, [])

  if (isLoading)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: BLACK,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    )

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="Home" component={HomeScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
