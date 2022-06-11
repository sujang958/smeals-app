import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:smeals/models/meal.dart';
import 'package:smeals/models/school.dart';
import 'package:smeals/screens/detail.dart';

class HomeSchoolItemWidget extends StatefulWidget {
  const HomeSchoolItemWidget(
      {Key? key, required this.school, required this.deletingNotifier})
      : super(key: key);

  final School school;
  final ValueNotifier<String?> deletingNotifier;

  @override
  State<StatefulWidget> createState() => _HomeSchoolItemState();
}

class _HomeSchoolItemState extends State<HomeSchoolItemWidget> {
  late Future<List<Meal>> meals;

  @override
  void initState() {
    super.initState();
    meals = fetchMeals(
        code: widget.school.code,
        scCode: widget.school.scCode,
        date: DateTime.now());
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        vertical: 6.0,
        horizontal: 20.0,
      ),
      child: GestureDetector(
          onTap: () {
            Navigator.pushNamed(context, '/detail',
                arguments: DetailScreenArguments(school: widget.school));
          },
          onLongPress: () {
            showCupertinoDialog(
                context: context,
                builder: (context) => CupertinoAlertDialog(
                      title: const Text("삭제"),
                      content: const Text("정말로 삭제하실 건가요?"),
                      actions: [
                        CupertinoDialogAction(
                          child: const Text("취소"),
                          onPressed: () => Navigator.pop(context),
                        ),
                        CupertinoDialogAction(
                          isDestructiveAction: true,
                          onPressed: () {
                            widget.deletingNotifier.value =
                                '${widget.school.scCode}:${widget.school.code}';
                            Navigator.pop(context);
                          },
                          child: const Text("삭제"),
                        ),
                      ],
                    ));
          },
          behavior: HitTestBehavior.translucent,
          child: Container(
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(14.0),
                  color: Colors.white),
              child: FutureBuilder(
                future: meals,
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    List<Meal> meals = snapshot.data as List<Meal>;
                    return Padding(
                      padding: const EdgeInsets.symmetric(
                        vertical: 22.0,
                        horizontal: 18.0,
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            widget.school.name,
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
                                    padding:
                                        const EdgeInsets.only(bottom: 14.0),
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Padding(
                                            padding: const EdgeInsets.only(
                                                bottom: 16.0),
                                            child: Text(
                                              meals.first.date
                                                  .toString()
                                                  .split(' ')[0],
                                              style: const TextStyle(
                                                fontSize: 22.0,
                                              ),
                                            )),
                                        for (final meal in meals)
                                          Padding(
                                            padding: const EdgeInsets.only(
                                                bottom: 14.0),
                                            child: Column(
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.start,
                                              children: [
                                                Text(
                                                  "${meal.type} - ${meal.calories}",
                                                  style: const TextStyle(
                                                      fontSize: 20.0),
                                                ),
                                                Padding(
                                                  padding: const EdgeInsets
                                                      .symmetric(vertical: 9.0),
                                                  child: Text(
                                                    meal.menu.join(", "),
                                                    softWrap: true,
                                                    style: const TextStyle(
                                                      fontSize: 18.0,
                                                    ),
                                                  ),
                                                ),
                                              ],
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
                    );
                  }

                  if (snapshot.hasError) {
                    return Padding(
                        padding: const EdgeInsets.symmetric(
                            vertical: 22.0, horizontal: 18.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                          Text(
                            widget.school.name,
                            style: const TextStyle(
                              fontSize: 32.0,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const Expanded(child: Center(
                            child: Text(
                              '오늘 급식이 없어요!',
                              style: TextStyle(
                                fontSize: 23.0
                              ),
                            ),
                          ),)
                        ]));
                  }

                  return const Center(
                    child: CupertinoActivityIndicator(
                      color: Colors.black,
                      radius: 14.4,
                    ),
                  );
                },
              ))),
    );
  }
}
