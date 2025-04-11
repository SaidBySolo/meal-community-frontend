import { GetWeeklyMealDTO } from "./dtos/meal";
import { CreateUserDTO } from "./dtos/user";

export const API_URL = "http://localhost:8000"


const requestLogin = async (email: string, password: string) => {
    const response = await fetch(API_URL + "/api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        credentials: "include",
    });
    return response;
}
const requestRegister = async (createUserDto: CreateUserDTO) => {
    const response = await fetch(API_URL + '/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(createUserDto),
    });

    return response
}

const requestSearchSchool = async (schoolName: string) => {
    const response = await fetch(API_URL + '/api/school/search', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: schoolName }),
    });

    return response
}


const requestGetWeeklyMeal = async (getWeeklyMealDTO: GetWeeklyMealDTO) => {
    const response = await fetch(API_URL + '/api/meal/weekly', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            edu_office_code: getWeeklyMealDTO.edu_office_code,
            standard_school_code: getWeeklyMealDTO.standard_school_code,
            date: getWeeklyMealDTO.date
        }),
    });
    return response
}

const requestIsValidToken = async (refreshToken: string) => {
    const response = await fetch(API_URL + '/api/user/verify', {
        method: 'GET'
    });

    return response
}

export {
    requestLogin,
    requestRegister,
    requestSearchSchool,
    requestGetWeeklyMeal,
}