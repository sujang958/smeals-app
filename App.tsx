import { NavigationContainer } from "@react-navigation/native"
import "react-native-gesture-handler"
import HomeScreen from "./screens/home"
import { loadAsync } from "expo-font"
import { ActivityIndicator, View } from "react-native"
import { BLACK, WHITE } from "./styles/theme"
import { useEffect, useReducer, useState } from "react"
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack"
import SearchScreen, { TResult } from "./screens/search"
import AsyncStorage from "@react-native-async-storage/async-storage"
import SchoolsContext from "./contexts/schools"

type RootStackParamList = {
  Home: undefined
  Search: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>

const RootStack = createStackNavigator<RootStackParamList>()

export type SchoolReducerActions =
  | { type: "DELETE_SCHOOL"; school: TResult }
  | { type: "ADD_SCHOOL"; school: TResult }
  | { type: "SET_SCHOOL"; schools: TResult[] }

export default function App() {
  const [schools, dispatch] = useReducer(
    (prev: TResult[], action: SchoolReducerActions) => {
      switch (action.type) {
        case "ADD_SCHOOL":
          return [
            ...prev.filter(
              ({ scCode, code }) =>
                scCode !== action.school.scCode || code !== action.school.code
            ),
            action.school,
          ].filter((school) => school)
        case "DELETE_SCHOOL":
          return [
            ...prev.filter(
              ({ scCode, code }) =>
                scCode !== action.school.scCode || code !== action.school.code
            ),
          ]
        case "SET_SCHOOL":
          return action.schools
        default:
          return prev
      }
    },
    []
  )

  const [isLoading, setLoading] = useState(true)
  const [isSyncing, setSyncing] = useState(false)
  const getFont = async () => {
    await loadAsync({
      PretendardBold: require("./assets/fonts/Pretendard-Bold.otf"),
      PretendardLight: require("./assets/fonts/Pretendard-Light.otf"),
      PretendardMedium: require("./assets/fonts/Pretendard-Medium.otf"),
      PretendardRegular: require("./assets/fonts/Pretendard-Regular.otf"),
    })
  }
  const loadAssets = async () => {
    setSyncing(false)
    setLoading(true)
    await getFont()
    dispatch({
      type: "SET_SCHOOL",
      schools: JSON.parse((await AsyncStorage.getItem("schools")) ?? "[]"),
    })
    setLoading(false)
    setSyncing(true)
  }

  useEffect(() => {
    loadAssets()
  }, [])
  useEffect(() => {
    if (isSyncing) AsyncStorage.setItem("schools", JSON.stringify(schools))
  }, [schools])

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
      <SchoolsContext.Provider value={{ schools, dispatch }}>
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
      </SchoolsContext.Provider>
    </NavigationContainer>
  )
}
