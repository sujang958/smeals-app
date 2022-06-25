export interface Meal {
  schoolName: string;
  meals: MealItem[];
}

export class MealItem {
  kcal: string;
  type: string;
  date: string;
  dishes: string[];
  nutrients: [string, string][];
}
