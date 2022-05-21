import { FC, useEffect, useState } from "react"
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native"
import { RootStackScreenProps } from "../App"
import Text from "../components/text"
import MealDetailStyles from "../styles/mealDetailStyles"
import DateTimePicker from "@react-native-community/datetimepicker"
import { dateToYYYYMMDD, THomeSchoolMeal } from "../components/homeSchooltem"
import api from "../utils/api"
import { AxiosError } from "axios"
import { BLACK, SCREEN_HEIGHT, WHITE } from "../styles/theme"

const MealDetailsScreen: FC<RootStackScreenProps<"MealDetails">> = ({
  route,
}) => {
  const [date, setDate] = useState(new Date())
  const [isLoading, setLoading] = useState(true)
  const [meals, setMeals] = useState<THomeSchoolMeal[]>([])
  const [isShown, setShown] = useState(Platform.OS === "android" ? false : true)
  const loadMeals = async () => {
    setLoading(true)
    try {
      const { data } = await api.get("/meals", {
        params: {
          code: route.params.code,
          scCode: route.params.scCode,
          date: dateToYYYYMMDD(date),
        },
      })
      setMeals(
        data.meals.map(({ type, meal, calories }: any) => ({
          type,
          meal,
          calories,
        }))
      )
    } catch (e) {
      if (e instanceof AxiosError) {
        const statusCode: number = (e.toJSON() as any).status
        switch (statusCode) {
          case 404:
            setMeals([
              {
                type: "없어요",
                calories: "아니 없어요",
                meal: ["급식이 없습니다"],
              },
            ])
        }
      } else {
        alert("알 수 없는 에러가 발생했습니다!")
      }
    }

    setLoading(false)
  }

  useEffect(() => {
    loadMeals()
  }, [date])

  return (
    <View style={MealDetailStyles.container}>
      <View style={MealDetailStyles.header}>
        <Text style={MealDetailStyles.headerTitle}>{route.params.name}</Text>
        <Text style={MealDetailStyles.headerTitle2}>급식 정보</Text>
      </View>
      {Platform.OS === "android" && (
        <Pressable
          style={MealDetailStyles.androidDatePicker}
          onPress={() => setShown((prev) => !prev)}
        >
          <Text style={{ fontFamily: "PretendardMedium" }}>날짜 선택하기</Text>
        </Pressable>
      )}

      {isShown && (
        <DateTimePicker
          locale="ko"
          value={date}
          mode="date"
          themeVariant="dark"
          {...(Platform.OS !== "android" && { display: "compact" })}
          onChange={({ nativeEvent: { timestamp } }: any) => {
            if (!timestamp) return
            if (Platform.OS === "android") setShown(false)
            setDate(new Date(timestamp))
          }}
        />
      )}
      <ScrollView contentContainerStyle={MealDetailStyles.body}>
        <Text style={MealDetailStyles.dateTitle}>
          {`${date.getMonth() + 1}월 ${date.getDate()}일`}
        </Text>
        {isLoading ? (
          <View
            style={{
              height: SCREEN_HEIGHT / 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : (
          meals.map(({ type, calories, meal }, i) => (
            <View style={MealDetailStyles.mealItem} key={i}>
              <Text style={MealDetailStyles.mealItemTitle}>
                {type} - {calories}
              </Text>
              <View style={MealDetailStyles.mealDishContainer}>
                {meal.map((dish, j) => (
                  <Text style={MealDetailStyles.mealItemDish} key={j}>
                    {dish
                      .replace(/\(.+?\)/gi, "")
                      .replace(/\*/gi, "")
                      .trim()}
                    {j + 1 === meal.length ? "" : ","}
                  </Text>
                ))}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}

export default MealDetailsScreen
