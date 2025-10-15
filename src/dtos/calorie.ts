
interface CalorieInfo {
  name: string;
  calories: string | null;

}

interface CalorieData {
  meals: CalorieInfo[];
  total_calories: number;
}

export type {
  CalorieData,
  CalorieInfo
}

