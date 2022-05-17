import { NavigationContainer } from "@react-navigation/native"
import "react-native-gesture-handler"
import HomeScreen from "./screens/homet"
import { loadAsync } from "expo-font"
import { ActivityIndicator, View } from "react-native"
import { BLACK, WHITE } from "./styles/theme"
import { useEffect, useState } from "react"
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack"
import SearchScreen from "./screens/search"

type RootStackParamList = {
  Home: undefined
  Search: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>

const RootStack = createStackNavigator<RootStackParamList>()

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
        <RootStack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerStyle: { backgroundColor: BLACK },
            headerTitle: "검색",
            headerTitleStyle: { color: WHITE },
            headerShown: true,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
