
interface PartialSchoolInfo {
    name: string;
    edu_office_code: string;
    standard_school_code: string;
}

interface Meal {
    meal_id: number;
    name: string;
    dish_name: string;
    calorie: string;
    date: string;
}


export type {
    PartialSchoolInfo,
    Meal
}