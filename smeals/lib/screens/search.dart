// ignore_for_file: prefer_const_constructors

import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:smeals/main.dart';
import 'package:smeals/models/school.dart';
import 'package:smeals/widgets/root.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  bool isLoading = false;

  final Map<String, School> schools = {};
  final inputController = TextEditingController();

  void _searchSchools() async {
    if (inputController.text.isEmpty) return;
    setState(() {
      isLoading = true;
      schools.clear();
    });
    try {
      final results = await fetchSchools(inputController.text.trim());
      for (final school in results) {
        setState(() {
          schools['${school.scCode}:${school.code}'] = school;
        });
      }
    } catch (e) {
      showCupertinoDialog(
          context: context,
          builder: (context) => CupertinoAlertDialog(
                title: const Text("학교를 찾을 수 없습니다!"),
                actions: [
                  CupertinoDialogAction(
                    child: const Text("저런!"),
                    onPressed: () => Navigator.pop(context),
                  ),
                ],
              ));
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  void _addSchoolToPrefs(School school) async {
    final prefs = await SharedPreferences.getInstance();
    final List<String> previous = prefs.getStringList(prefsKey) ?? [];
    if (previous
        .where((element) => ((decoded) =>
            decoded['code'] == school.code &&
            decoded['scCode'] == school.scCode)(jsonDecode(element)))
        .isNotEmpty) return;
    previous.add(jsonEncode(school.toJson()));
    await prefs.setStringList(prefsKey, previous);
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        backgroundColor: Colors.black,
      ),
      child: SafeArea(
        child: RootWidget(
          child: Padding(
            padding:
                const EdgeInsets.symmetric(vertical: 28.0, horizontal: 20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CupertinoTextField(
                  controller: inputController,
                  keyboardType: TextInputType.text,
                  autofocus: true,
                  style: const TextStyle(fontSize: 18.0, color: Colors.white),
                  padding: const EdgeInsets.symmetric(
                    vertical: 10.0,
                    horizontal: 12.0,
                  ),
                  placeholder: "학교 이름을 검색하세요!",
                  placeholderStyle: TextStyle(
                    fontSize: 18.0,
                    color: Colors.grey[400],
                  ),
                  decoration: BoxDecoration(
                      color: Colors.grey[900],
                      borderRadius: BorderRadius.circular(10.0)),
                  suffix: Material(
                    color: Colors.transparent,
                    child: IconButton(
                      icon: Icon(
                        CupertinoIcons.search,
                        color: Colors.white,
                        size: 24.0,
                      ),
                      onPressed: () => _searchSchools(),
                    ),
                  ),
                  onSubmitted: (_) => _searchSchools(),
                ),
                const Padding(padding: EdgeInsets.symmetric(vertical: 16.0)),
                Expanded(
                  child: isLoading
                      ? Center(
                          child: CupertinoActivityIndicator(
                            radius: 14.0,
                          ),
                        )
                      : ListView(
                          physics: BouncingScrollPhysics(),
                          children: schools.entries
                              .map((school) => Material(
                                    color: Colors.transparent,
                                    child: ListTile(
                                      onTap: () =>
                                          _addSchoolToPrefs(school.value),
                                      contentPadding:
                                          const EdgeInsets.symmetric(
                                        vertical: 5.0,
                                        horizontal: 4.0,
                                      ),
                                      tileColor: Colors.transparent,
                                      title: Text(
                                        school.value.name,
                                        style: const TextStyle(
                                            fontSize: 20.0,
                                            color: Colors.white),
                                      ),
                                    ),
                                  ))
                              .toList()),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
