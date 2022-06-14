//
//  TodayMealsWidget.swift
//  TodayMealsWidget
//
//  Created by 조성훈 on 2022/06/12.
//

import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
//    func placeholder(in context: Context) -> SimpleEntry {
//        SimpleEntry(date: Date())
//    }
//
//    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
//        let entry = SimpleEntry(date: Date())
//        completion(entry)
//    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [SimpleEntry] = []

        let sharedDefaults = UserDefaults.init(suiteName: "group.co.smeals")
        var flutterData: FlutterData?
        
        if (sharedDefaults != nil) {
            do {
              let shared = sharedDefaults?.string(forKey: "widgetData")
              if(shared != nil){
                let decoder = JSONDecoder()
                flutterData = try decoder.decode(FlutterData.self, from: shared!.data(using: .utf8)!)
              }
            } catch {
              print(error)
            }
        }
        
        let entryDate = Calendar.current.date(byAdding: .hour, value: 24, to: Date())!
        entries.append(SimpleEntry(date: entryDate, flutterData: flutterData));

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct FlutterData: Decodable, Hashable {
    let text: String
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let flutterData: FlutterData?
}

struct TodayMealsWidgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
        Text(entry.date, style: .time)
    }
}

@main
struct TodayMealsWidget: Widget {
    let kind: String = "TodayMealsWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) {
            entry in TodayMealsWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("급식 위젯")
        .description("오늘 급식을 보여주는 위젯입니다.")
    }
}

struct TodayMealsWidget_Previews: PreviewProvider {
    static var previews: some View {
        TodayMealsWidgetEntryView(entry: SimpleEntry(date: Date()))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
