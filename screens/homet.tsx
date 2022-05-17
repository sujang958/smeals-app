import { FC } from "react"
import { ScrollView, TouchableOpacity, View } from "react-native"
import { RootStackScreenProps } from "../App"
import Text from "../components/text"

import HomeStyles from "../styles/homeStyles"

const HomeScreen: FC<RootStackScreenProps<"Home">> = ({ navigation }) => {
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
        <TouchableOpacity
          activeOpacity={0.7}
          style={HomeStyles.schoolContainer}
        >
          <View style={HomeStyles.schoolItem}>
            <Text style={HomeStyles.schoolTitle}>대구동중학교</Text>
            <View style={HomeStyles.mealContainer}>
              <Text style={HomeStyles.mealTitle}>5월 28일(오늘)</Text>
              <View style={HomeStyles.mealItem}>
                <Text style={HomeStyles.mealItemTitle}>조식 - 628 kcal</Text>
                <View style={HomeStyles.mealItemContentContainer}>
                  <Text style={HomeStyles.mealItemContentText}>스파게티,</Text>
                  <Text style={HomeStyles.mealItemContentText}>피자,</Text>
                  <Text style={HomeStyles.mealItemContentText}>
                    카망베르치즈,
                  </Text>
                  <Text style={HomeStyles.mealItemContentText}>발르슈트,</Text>
                  <Text style={HomeStyles.mealItemContentText}>리코타치즈</Text>
                </View>
              </View>
              <View style={HomeStyles.mealItem}>
                <Text style={HomeStyles.mealItemTitle}>조식 - 628 kcal</Text>
                <View style={HomeStyles.mealItemContentContainer}>
                  <Text style={HomeStyles.mealItemContentText}>스파게티,</Text>
                  <Text style={HomeStyles.mealItemContentText}>피자,</Text>
                  <Text style={HomeStyles.mealItemContentText}>
                    카망베르치즈,
                  </Text>
                  <Text style={HomeStyles.mealItemContentText}>발르슈트,</Text>
                  <Text style={HomeStyles.mealItemContentText}>리코타치즈</Text>
                </View>
              </View>
              <View style={HomeStyles.mealItem}>
                <Text style={HomeStyles.mealItemTitle}>조식 - 628 kcal</Text>
                <View style={HomeStyles.mealItemContentContainer}>
                  <Text style={HomeStyles.mealItemContentText}>스파게티,</Text>
                  <Text style={HomeStyles.mealItemContentText}>피자,</Text>
                  <Text style={HomeStyles.mealItemContentText}>
                    카망베르치즈,
                  </Text>
                  <Text style={HomeStyles.mealItemContentText}>발르슈트,</Text>
                  <Text style={HomeStyles.mealItemContentText}>리코타치즈</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default HomeScreen
