import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_widgetkit/flutter_widgetkit.dart';
import 'package:smeals/screens/detail.dart';
import 'package:smeals/screens/home.dart';
import 'package:smeals/screens/search.dart';
import 'package:workmanager/workmanager.dart';

const prefsKey = "__smeals__schools_list__";

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Workmanager().initialize(() {
    Workmanager().executeTask((taskName, inputData) async {
      if (taskName == "getNewMeals") {
        WidgetKit.setItem("widgetData", jsonEncode({
          'text': '국밥굽박박바가'
        }), 'group.co.smeals');
        WidgetKit.reloadAllTimelines();
      }

      return true;
    });
  });
  await Workmanager().registerPeriodicTask("_SMEALS_NEWMEAL", "getNewMeals",
      frequency: const Duration(minutes: 30),
      constraints: Constraints(networkType: NetworkType.connected));
  runApp(const App());
}

class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Smeals - 우리학교 급식 보기',
      themeMode: ThemeMode.dark,
      theme: ThemeData(
        brightness: Brightness.dark,
        backgroundColor: Colors.black,
        scaffoldBackgroundColor: Colors.black,
        splashColor: Colors.transparent,
        highlightColor: Colors.transparent,
      ),
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [Locale('ko')],
      initialRoute: '/',
      routes: {
        '/': (context) => HomeScreen(),
        '/detail': (context) => DetailScreen(),
        '/search': (context) => SearchScreen(),
      },
    );
  }
}
