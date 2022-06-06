import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:smeals/models/meal.dart';
import 'package:smeals/models/school.dart';
import 'package:smeals/screens/detail.dart';
import 'package:smeals/widgets/root.dart';

class HomeSchoolItemWidget extends StatefulWidget {
  const HomeSchoolItemWidget({Key? key, required this.school})
      : super(key: key);

  final School school;

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
            Navigator.pushNamed(context, '/detail');
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
                    print(meals[0].date);
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
                                                    style: TextStyle(
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
                    return Center(
                      child: Text(
                        "${widget.school.name}\n급식 없!음",
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          fontSize: 28.0,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    );
                  }

                  return const Center(
                    child: CupertinoActivityIndicator(
                      color: Colors.black,
                      radius: 14.0,
                    ),
                  );
                },
              ))),
    );
  }
}
