import 'dart:convert';

import 'package:http/http.dart' as http;

const fetchMealsUri =
    'http://asia-northeast3-smeals-school.cloudfunctions.net/v1/meals';

class Nutrient {
  final String name;
  final String value;

  const Nutrient({
    required this.name,
    required this.value,
  });
}

class Meal {
  final String type;
  final DateTime date;
  final List<String> menu;
  final String calories;
  final List<Nutrient> nutrients;

  const Meal({
    required this.type,
    required this.date,
    required this.menu,
    required this.calories,
    required this.nutrients,
  });

  factory Meal.fromJson(Map<String, dynamic> json) {
    return Meal(
        type: json['type'],
        date: DateTime.parse(json['date']),
        menu: List.from(json['meal'])
            .map((e) => e.toString().split("(")[0].trim())
            .toList(),
        calories: json['calories'],
        nutrients: List.from(json['nutrient'])
            .map((e) => Nutrient(name: e['name'], value: e['value']))
            .toList());
  }
}

Future<List<Meal>> fetchMeals({
  required String code,
  required String scCode,
  required DateTime date,
}) async {
  final formattedDate =
      '${date.year}${date.month < 10 ? '0${date.month}' : date.month}${date.day < 10 ? '0${date.day}' : date.day}';

  final response = await http.get(Uri.parse(
      '$fetchMealsUri?code=$code&scCode=$scCode&date=$formattedDate'));

  if (response.statusCode >= 400) {
    throw Exception(["Can't fetch meals!", response.body]);
  }

  final decoded = jsonDecode(response.body);
  final List<dynamic> jsonMeals = decoded['meals'];

  return jsonMeals.map((e) => Meal.fromJson(e)).toList();
}
