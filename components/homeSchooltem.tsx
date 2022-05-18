import { AxiosError } from "axios"
import { FC, useEffect, useState } from "react"
import { ActivityIndicator, Alert, TouchableOpacity, View } from "react-native"
import { TResult } from "../screens/search"
import HomeStyles from "../styles/homeStyles"
import api from "../utils/api"
import Text from "./text"

export type THomeSchoolMeal = {
  type: string
  meal: string[]
  calories: string
}

const dateToYYYYMMDD = (date: Date) =>
  date.toJSON().split("T")[0].replace(/-/gi, "")

const HomeSchoolItem: FC<
  TResult & { deleteSchool: (school: TResult) => Promise<void> }
> = ({ name, scCode, code, deleteSchool }) => {
  const [date, setDate] = useState(new Date())
  const [isLoading, setLoading] = useState(true)
  const [meals, setMeals] = useState<THomeSchoolMeal[]>([])
  const loadMeals = async () => {
    setLoading(true)
    try {
      const { data } = await api.get("/meals", {
        params: { code, scCode, date: dateToYYYYMMDD(date) },
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
  const askToDelete = () => {
    Alert.alert("삭?제", "정말로 삭제하시겠습니까?", [
      {
        text: "삭!제",
        style: "destructive",
        onPress: () => deleteSchool({ code, scCode, name }),
      },
      { text: "취?소" },
    ])
  }

  useEffect(() => {
    loadMeals()
  }, [date])
  useEffect(() => {
    const timeCheckingInterval = setInterval(() => {
      if (new Date().getDate() !== date.getDate()) setDate(new Date())
    }, 3000)

    return () => clearInterval(timeCheckingInterval)
  }, [])

  return (
    <TouchableOpacity
      delayLongPress={2000}
      onLongPress={askToDelete}
      activeOpacity={0.7}
      style={HomeStyles.schoolContainer}
    >
      <View style={HomeStyles.schoolItem}>
        <View style={HomeStyles.schoolTitleContainer}>
          <Text style={HomeStyles.schoolTitle}>{name}</Text>
        </View>
        <View style={HomeStyles.mealContainer}>
          <Text style={HomeStyles.mealTitle}>
            {`${date.getMonth() + 1}월 ${date.getDate()}일`}(오늘)
          </Text>
          {isLoading ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="large" />
            </View>
          ) : (
            meals.map(({ meal, type, calories }, i) => (
              <View style={HomeStyles.mealItem} key={i}>
                <Text style={HomeStyles.mealItemTitle}>
                  {type} - {calories}
                </Text>
                <View style={HomeStyles.mealItemContentContainer}>
                  {meal.map((dish, j) => (
                    <Text key={j} style={HomeStyles.mealItemContentText}>
                      {dish.replace(/\(.+?\)/gi, "").trim()},
                    </Text>
                  ))}
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default HomeSchoolItem
