import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:smeals/screens/detail.dart';
import 'package:smeals/widgets/root.dart';

class HomeSchoolItemWidget extends StatefulWidget {
  const HomeSchoolItemWidget({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _HomeSchoolItemState();
}

class _HomeSchoolItemState extends State<HomeSchoolItemWidget> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        vertical: 6.0,
        horizontal: 20.0,
      ),
      child: GestureDetector(
          onTap: () {
            Navigator.push(context,
                CupertinoPageRoute(builder: (context) => DetailScreen()));
          },
          behavior: HitTestBehavior.translucent,
          child: Container(
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(14.0),
                  color: Colors.white),
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  vertical: 22.0,
                  horizontal: 18.0,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "대구동중학교",
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 32.0,
                      ),
                    ),
                    const Padding(
                        padding: EdgeInsets.symmetric(vertical: 12.0)),
                    Expanded(
                      child: SingleChildScrollView(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              padding: const EdgeInsets.only(bottom: 14.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Padding(
                                      padding:
                                          const EdgeInsets.only(bottom: 16.0),
                                      child: Text(
                                        "2022년 2월 22일",
                                        style: const TextStyle(
                                          fontSize: 22.0,
                                        ),
                                      )),
                                  Text(
                                    "중식 - 546.1 kcal",
                                    style: const TextStyle(fontSize: 20.0),
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.symmetric(
                                        vertical: 9.0),
                                    child: Text(
                                      "닭가슴살, 닭가슴살, 닭가슴살, 닭가슴살, 닭가슴살, 닭가슴살, 닭가슴살",
                                      softWrap: true,
                                      style: TextStyle(
                                        fontSize: 18.0,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            )
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ))),
    );
  }
}
