
interface CalorieInfo {
    name: string;
    calories: string | null;

}

interface CalorieData {
    meals: CalorieInfo[];
  total_calories: string;
}

export type {
    CalorieData,
    CalorieInfo
}

