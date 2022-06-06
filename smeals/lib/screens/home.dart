// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:smeals/widgets/homeSchoolItem.dart';
import 'package:smeals/widgets/root.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: RootWidget(
            child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Padding(
              padding: EdgeInsets.only(
                top: 52.0,
                bottom: 32.0,
                left: 20.0,
                right: 20.0,
              ),
              child: Text(
                "급식",
                style: TextStyle(
                  fontSize: 46.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const Padding(padding: EdgeInsets.symmetric(vertical: 16.0)),
            Expanded(
                child: DefaultTextStyle(
                    style: const TextStyle(
                        color: Colors.black, fontFamily: "Pretendard"),
                    child: PageView(
                      children: [
                        HomeSchoolItemWidget(),
                        HomeSchoolItemWidget(),
                        HomeSchoolItemWidget(),
                      ],
                    ))),
            Padding(padding: EdgeInsets.symmetric(vertical: 68.0)),
          ],
        )),
      ),
    );
  }
}
