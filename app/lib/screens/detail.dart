import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';
import 'package:smeals/models/school.dart';
import 'package:smeals/widgets/root.dart';

import '../models/meal.dart';

class DetailScreenArguments {
  final School school;

  const DetailScreenArguments({required this.school});
}

class DetailScreen extends StatefulWidget {
  const DetailScreen({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _DetailScreenState();
}

class _DetailScreenState extends State<DetailScreen> {
  final ValueNotifier<DateTime> dateNotifier = ValueNotifier(DateTime.now());

  Future<List<Meal>>? meals;

  late School school;

  DateTime date = DateTime.now();

  @override
  void initState() {
    super.initState();
    dateNotifier.addListener(() {
      setState(() {
        date = dateNotifier.value;
        meals = null;
        _fetchMeals();
      });
    });
  }

  void _fetchMeals() {
    setState(() {
      meals = fetchMeals(code: school.code, scCode: school.scCode, date: date);
    });
  }

  @override
  Widget build(BuildContext context) {
    final args =
        ModalRoute.of(context)!.settings.arguments as DetailScreenArguments;
    setState(() {
      school = args.school;
      _fetchMeals();
    });

    return CupertinoPageScaffold(
      navigationBar: const CupertinoNavigationBar(
        backgroundColor: Colors.black,
      ),
      child: SafeArea(
        maintainBottomViewPadding: true,
        child: RootWidget(
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.only(top: 42.0, bottom: 21.0),
                  child: Text(
                    "${args.school.name}\n급식 정보",
                    style: const TextStyle(
                        fontWeight: FontWeight.bold, fontSize: 34.0),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 2.0),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        dateNotifier.value.toString().split(" ")[0],
                        style: const TextStyle(fontSize: 22.0),
                      ),
                      Material(
                          color: Colors.transparent,
                          child: IconButton(
                              onPressed: () {
                                DatePicker.showDatePicker(context,
                                    currentTime: dateNotifier.value,
                                    locale: LocaleType.ko,
                                    theme: const DatePickerTheme(
                                        backgroundColor:
                                            CupertinoColors.darkBackgroundGray,
                                        cancelStyle: TextStyle(
                                          color: CupertinoColors.destructiveRed,
                                        ),
                                        itemStyle:
                                            TextStyle(color: Colors.white)),
                                    onConfirm: (date) =>
                                        dateNotifier.value = date);
                              },
                              icon: const Icon(
                                CupertinoIcons.time,
                                color: Colors.white,
                                size: 30.0,
                              ))),
                    ],
                  ),
                ),
                const Padding(padding: EdgeInsets.symmetric(vertical: 8.0)),
                Expanded(
                    child: FutureBuilder(
                        future: meals,
                        builder: (context, snapshot) {
                          if (snapshot.hasData) {
                            List<Meal> meals = snapshot.data as List<Meal>;

                            return ListView(
                              physics: const BouncingScrollPhysics(),
                              children: [
                                for (final meal in meals)
                                  Padding(
                                    padding: const EdgeInsets.only(
                                        top: 10.0, bottom: 20.0),
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          "${meal.type} - ${meal.calories}",
                                          style:
                                              const TextStyle(fontSize: 21.0),
                                        ),
                                        const Padding(
                                            padding: EdgeInsets.symmetric(
                                                vertical: 7.0)),
                                        Text(
                                          meal.menu.join(", "),
                                          style:
                                              const TextStyle(fontSize: 18.0),
                                        )
                                      ],
                                    ),
                                  ),
                              ],
                            );
                          }

                          if (snapshot.hasError) {
                            return const Center(
                              child: Text(
                                "급식이 없어요!",
                                style: TextStyle(fontSize: 26.0),
                              ),
                            );
                          }

                          return const Center(
                            child: CupertinoActivityIndicator(
                              radius: 14.0,
                            ),
                          );
                        })),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
