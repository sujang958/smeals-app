import 'dart:convert';

import 'package:http/http.dart' as http;

const fetchSchoolsUri =
    "https://asia-northeast3-smeals-school.cloudfunctions.net/meals/schools?name=";

class School {
  final String code;
  final String scCode;
  final String name;

  const School({
    required this.code,
    required this.scCode,
    required this.name,
  });

  factory School.fromJson(Map<String, dynamic> json) {
    return School(
        code: json['code'], scCode: json['scCode'], name: json['name']);
  }

  Map<String, dynamic> toJson() {
    return {'code': code, 'scCode': scCode, 'name': name};
  }
}

Future<List<School>> fetchSchools(String? name) async {
  final response = await http.get(Uri.parse('$fetchSchoolsUri${name ?? '교'}'));

  if (response.statusCode >= 400) {
    throw Exception("Can't fetch schools!");
  }

  final json = jsonDecode(response.body);
  final List<dynamic> jsonSchools = json['schools'];

  return jsonSchools.map((school) => School.fromJson(school)).toList();
}
