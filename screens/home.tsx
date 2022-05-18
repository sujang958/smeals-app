import AsyncStorage from "@react-native-async-storage/async-storage"
import { FC, useContext, useEffect, useState } from "react"
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native"
import { RootStackScreenProps } from "../App"
import HomeSchoolItem from "../components/homeSchooltem"
import Text from "../components/text"
import SchoolsContext from "../contexts/schools"

import HomeStyles from "../styles/homeStyles"
import { SCREEN_WIDTH } from "../styles/theme"
import { TResult } from "./search"

const HomeScreen: FC<RootStackScreenProps<"Home">> = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true)
  const { schools, dispatch } = useContext(SchoolsContext)
  const deleteSchool = async (school: TResult) => {
    setLoading(true)
    dispatch({ type: "DELETE_SCHOOL", school })
    setLoading(false)
  }
  const setSchoolsFromStore = async () => {
    setLoading(true)
    dispatch({
      type: "SET_SCHOOL",
      schools: JSON.parse((await AsyncStorage.getItem("schools")) ?? "[]"),
    })
    setLoading(false)
  }

  useEffect(() => {
    setSchoolsFromStore()
    const focusToUpdateSchools = () => setSchoolsFromStore()
    navigation.addListener("focus", focusToUpdateSchools)
    return () => navigation.removeListener("focus", focusToUpdateSchools)
  }, [])
  useEffect(() => {}, [schools])

  return (
    <View style={HomeStyles.container}>
      <View style={HomeStyles.header}>
        <Text style={HomeStyles.titleText}>급식</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Text style={HomeStyles.plusText}>+</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsVerticalScrollIndicator
        contentContainerStyle={HomeStyles.body}
      >
        {isLoading ? (
          <View
            style={{
              width: SCREEN_WIDTH,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : schools.length < 1 ? (
          <View
            style={{
              width: SCREEN_WIDTH,
              alignItems: "center",
              justifyContent: "center",
              marginTop: -54,
            }}
          >
            <Text style={{ fontSize: 20 }}>
              + 버튼을 클릭해 학교를 추가 해 보세요!
            </Text>
          </View>
        ) : (
          schools.map((school, i) => (
            <HomeSchoolItem {...school} key={i} deleteSchool={deleteSchool} />
          ))
        )}
      </ScrollView>
    </View>
  )
}

export default HomeScreen
