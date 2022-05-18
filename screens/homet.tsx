import AsyncStorage from "@react-native-async-storage/async-storage"
import { FC, useEffect, useState } from "react"
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native"
import { RootStackScreenProps } from "../App"
import HomeSchoolItem from "../components/homeSchooltem"
import Text from "../components/text"

import HomeStyles from "../styles/homeStyles"
import { SCREEN_WIDTH } from "../styles/theme"
import { TResult } from "./search"

const HomeScreen: FC<RootStackScreenProps<"Home">> = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true)
  const [schools, setSchools] = useState<TResult[]>([])
  const deleteSchool = async (school: TResult) => {
    setLoading(true)
    setSchools((previous) => [
      ...previous.filter(
        ({ name, scCode, code }) =>
          name !== school.name &&
          scCode !== school.scCode &&
          code !== school.code
      ),
    ])
    setLoading(false)
  }
  const setSchoolsFromStore = async () => {
    setLoading(true)
    setSchools(JSON.parse((await AsyncStorage.getItem("schools")) ?? "[]"))
    setLoading(false)
  }
  const syncSchoolsWithState = async () => {
    const storageSchools: TResult[] = JSON.parse(
      (await AsyncStorage.getItem("schools")) ?? "[]"
    )
    await AsyncStorage.setItem(
      "schools",
      JSON.stringify(
        storageSchools.filter((storageSchool) =>
          schools.find(
            ({ name, scCode, code }) =>
              name === storageSchool.name &&
              scCode === storageSchool.scCode &&
              code === storageSchool.code
          )
        )
      )
    )
  }

  useEffect(() => {
    setSchoolsFromStore()
    const focusToUpdateSchools = () => {
      setSchoolsFromStore()
    }
    navigation.addListener("focus", focusToUpdateSchools)
    return () => navigation.removeListener("focus", focusToUpdateSchools)
  }, [])
  useEffect(() => {
    syncSchoolsWithState()
  }, [schools])

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
