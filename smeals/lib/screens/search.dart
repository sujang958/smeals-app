// ignore_for_file: prefer_const_constructors

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:smeals/widgets/homeSchoolItem.dart';
import 'package:smeals/widgets/root.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
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
                  autofocus: true,
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
                      onPressed: () {},
                    ),
                  ),
                ),
                const Padding(padding: EdgeInsets.symmetric(vertical: 16.0)),
                Expanded(
                  child: ListView(
                    physics: BouncingScrollPhysics(),
                    children: List.generate(
                        100,
                        (index) => Material(
                              color: Colors.transparent,
                              child: ListTile(
                                contentPadding: const EdgeInsets.symmetric(
                                  vertical: 5.0,
                                  horizontal: 4.0,
                                ),
                                tileColor: Colors.transparent,
                                title: Text(
                                  "대구동중학교",
                                  style: const TextStyle(
                                      fontSize: 20.0, color: Colors.white),
                                ),
                              ),
                            )),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
