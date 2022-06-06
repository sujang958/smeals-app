import 'dart:ui';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:smeals/widgets/root.dart';

class DetailScreen extends StatefulWidget {
  const DetailScreen({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _DetailScreenState();
}

class _DetailScreenState extends State<DetailScreen> {
  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        backgroundColor: Colors.black,
      ),
      child: SafeArea(
        maintainBottomViewPadding: true,
        child: RootWidget(
          child: Container(
            padding: EdgeInsets.symmetric(horizontal: 20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: EdgeInsets.only(top: 42.0, bottom: 21.0),
                  child: Text(
                    "대구동중학교\n급식 정보",
                    style:
                        TextStyle(fontWeight: FontWeight.bold, fontSize: 34.0),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.symmetric(vertical: 2.0),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const SizedBox.shrink(),
                      Material(
                          color: Colors.transparent,
                          child: IconButton(
                              onPressed: () {
                                showCupertinoModalPopup(
                                    context: context,
                                    builder: (context) => DatePickerWidget(
                                          dateNotifier:
                                              ValueNotifier(DateTime.now()),
                                        ));
                              },
                              icon: Icon(
                                CupertinoIcons.time,
                                color: Colors.white,
                                size: 30.0,
                              ))),
                    ],
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

class DatePickerWidget extends StatefulWidget {
  const DatePickerWidget({Key? key, required this.dateNotifier})
      : super(key: key);

  final ValueNotifier<DateTime> dateNotifier;

  @override
  State<StatefulWidget> createState() => _DatePickerState();
}

class _DatePickerState extends State<DatePickerWidget> {
  late DateTime date;

  @override
  void initState() {
    super.initState();
    date = widget.dateNotifier.value;
  }

  @override
  Widget build(BuildContext context) {
    return BackdropFilter(
      filter: ImageFilter.blur(sigmaX: 10.0, sigmaY: 10.0),
      child: Container(
          color: Colors.white.withAlpha(200),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Expanded(
                child: CupertinoDatePicker(
                    onDateTimeChanged: (date) {
                      setState(() {
                        this.date = date;
                      });
                    },
                    mode: CupertinoDatePickerMode.date),
              ),
              Padding(
                padding: const EdgeInsets.only(
                  bottom: 52.0,
                  left: 20.0,
                  right: 20.0,
                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Expanded(
                      child: CupertinoButton(
                          child: Text('취소'),
                          onPressed: () {
                            Navigator.pop(context);
                          },
                          color: CupertinoColors.destructiveRed),
                    ),
                    const Padding(
                        padding: EdgeInsets.symmetric(horizontal: 4.0)),
                    Expanded(
                      child: CupertinoButton(
                        child: Text('확인'),
                        onPressed: () {
                          widget.dateNotifier.value = date;
                          Navigator.pop(context);
                        },
                        color: CupertinoColors.activeBlue,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          )),
    );
  }
}
