import 'package:flutter/material.dart';

class RootWidget extends StatelessWidget {
  const RootWidget({Key? key, required this.child}) : super(key: key);

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return DefaultTextStyle(style: const TextStyle(
      fontFamily: "Pretendard",
      color: Colors.white,
      fontWeight: FontWeight.w500
    ), child: child);
  }

}