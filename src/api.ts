import { GetDailyMealDTO } from "./dtos/meal";
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
    credentials: 'include',
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
  return response;
}

const requestRefresh = async () => {
  const response = await fetch(API_URL + "/api/user/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
    return true
  }
  return false
}


const requestGetDailyMeal = async (getDailyMealDTO: GetDailyMealDTO) => {
  const response = await fetch(API_URL + '/api/meal/daily', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify({
      date: getDailyMealDTO.date
    }),
  })
  return response
}

const requestCheckToken = async () => {
  const response = await fetch(API_URL + "/api/user/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    },
    credentials: "include",
  });
  return response.ok;
}

const requestLogout = async () => {
  const response = await fetch(API_URL + "/api/user/logout", {
    method: "GET",
    credentials: "include",
  });
  return response;
}

const requestMe = async () => {
  const response = await fetch(API_URL + "/api/user/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    },
    credentials: "include",
  });
  return response
}


export {
  requestLogin,
  requestRegister,
  requestSearchSchool,
  requestGetDailyMeal,
  requestCheckToken,
  requestRefresh,
  requestLogout,
  requestMe,
}