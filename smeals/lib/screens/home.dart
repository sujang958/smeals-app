// ignore_for_file: prefer_const_constructors

import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:smeals/main.dart';
import 'package:smeals/models/school.dart';
import 'package:smeals/widgets/homeSchoolItem.dart';
import 'package:smeals/widgets/root.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final Map<String, School> schools = {};
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadSchoolsFromPrefs();
  }

  void _loadSchoolsFromPrefs() async {
    setState(() {
      isLoading = true;
    });
    final prefs = await SharedPreferences.getInstance();
    final encodedList = prefs.getStringList(prefsKey) ?? [];
    if (encodedList.isNotEmpty) {
      setState(() {
        for (final school in encodedList
            .map((e) => jsonDecode(e))
            .map((e) => School.fromJson(e))) {
          schools['${school.scCode}:${school.code}'] = school;
        }
      });
    }
    setState(() {
      isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: RootWidget(
            child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
                padding: EdgeInsets.only(
                  top: 52.0,
                  bottom: 32.0,
                  left: 20.0,
                  right: 20.0,
                ),
                child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        "급식",
                        style: TextStyle(
                          fontSize: 46.0,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Material(
                            color: Colors.transparent,
                            child: IconButton(
                              icon: Icon(
                                CupertinoIcons.info,
                                color: Colors.white,
                                size: 26.0,
                              ),
                              onPressed: () {
                                // todo: use license registry to make standalone(/license) page
                                showLicensePage(context: context);
                              },
                            ),
                          ),
                          const Padding(
                              padding: EdgeInsets.symmetric(horizontal: 4.0)),
                          Material(
                            color: Colors.transparent,
                            child: IconButton(
                              icon: Icon(
                                CupertinoIcons.add,
                                color: Colors.white,
                                size: 26.0,
                              ),
                              onPressed: () =>
                                  Navigator.pushNamed(context, '/search')
                                      .then((_) => _loadSchoolsFromPrefs()),
                            ),
                          ),
                        ],
                      ),
                    ])),
            const Padding(padding: EdgeInsets.symmetric(vertical: 16.0)),
            Expanded(
                child: DefaultTextStyle(
                    style: const TextStyle(
                        color: Colors.black, fontFamily: "Pretendard"),
                    child: isLoading
                        ? const Center(
                            child: CupertinoActivityIndicator(
                              radius: 13.4,
                            ),
                          )
                        : PageView(
                            physics: BouncingScrollPhysics(),
                            children: [
                              for (final school in schools.entries)
                                HomeSchoolItemWidget(school: school.value)
                            ],
                          ))),
            Padding(padding: EdgeInsets.symmetric(vertical: 68.0)),
          ],
        )),
      ),
    );
  }
}
