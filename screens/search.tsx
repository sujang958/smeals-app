import { FC, useContext, useEffect, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import Text from "../components/text"
import SearchStyles from "../styles/searchStyles"
import { FontAwesome } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import useInput from "../hooks/useInput"
import api from "../utils/api"
import { AxiosError } from "axios"
import SchoolsContext from "../contexts/schools"

export type TResult = {
  code: string
  scCode: string
  name: string
}

const SearchScreen: FC = () => {
  const { schools, dispatch } = useContext(SchoolsContext)
  const [isLoading, setLoading] = useState(false)
  const [results, setResults] = useState<TResult[]>([])
  const [query, onInputChange] = useInput()
  const search = async () => {
    Keyboard.dismiss()
    setLoading(true)
    try {
      const { data } = await api.get("/schools", {
        params: { name: query.length < 1 ? "고등" : query },
      })
      setResults(
        data.schools.map(({ code, scCode, name }: any) => ({
          code,
          scCode,
          name,
        }))
      )
    } catch (e) {
      if (e instanceof AxiosError) {
        const statusCode: number = (e.toJSON() as any).status
        switch (statusCode) {
          case 404:
            Alert.alert("404 :(", "학교를 찾을 수 없습니다!", [
              { text: "저런!" },
            ])
          // case 400:
          //   Alert.alert("400 :(", "잘못된 요청입니다!")
        }
      } else {
        alert("알 수 없는 에러가 발생했습니다!")
      }
    }

    setLoading(false)
  }
  const addToStorage = async (school: TResult) => {
    setLoading(true)
    dispatch({ type: "ADD_SCHOOL", school })
    setLoading(false)
    Alert.alert("200 :)", "추가했습니다!")
  }

  useEffect(() => {
    search()
  }, [])

  return (
    <View style={SearchStyles.container}>
      <View style={SearchStyles.header}>
        <Text style={SearchStyles.headerTitle}>학교 검색</Text>
        <View style={SearchStyles.headerSearchInputContainer}>
          <TextInput
            style={SearchStyles.headerSearchInput}
            placeholder="학교 이름을 검색하세요"
            placeholderTextColor="#ccc"
            keyboardType="default"
            keyboardAppearance="dark"
            returnKeyType="search"
            onSubmitEditing={search}
            autoFocus
            value={query}
            onChangeText={onInputChange}
          />
          <TouchableOpacity
            onPress={search}
            style={SearchStyles.headerSearchButton}
          >
            <FontAwesome name="search" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {isLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
            zIndex: -20,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}

      {/* todo: vitualize */}
      <ScrollView contentContainerStyle={SearchStyles.body}>
        {results.map((result, i) => (
          <TouchableOpacity
            key={i}
            style={SearchStyles.schoolItem}
            onPress={() => addToStorage(result)}
            activeOpacity={0.6}
          >
            <Text style={SearchStyles.schoolItemTitle}>{result.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default SearchScreen
