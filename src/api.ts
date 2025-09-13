import { GetDailyMealDTO } from "./dtos/meal";
import { CreateUserDTO } from "./dtos/user";
import { CreateCommentDTO, GetCommentDTO } from "./dtos/comment";
import { CalorieData } from "./dtos/calorie";

export const API_URL = "http://localhost:8000"

// 인증이 필요한 fetch 래퍼
async function fetchWithAuthRetry(input: RequestInfo, init?: RequestInit) {
  let response = await fetch(input, init);

  if (response.status === 401) {
    // 토큰 갱신 시도
    const refreshed = await requestRefresh();
    if (refreshed) {
      // 토큰 갱신 성공 → Authorization 헤더 갱신 후 재요청
      if (init?.headers && typeof init.headers === "object") {
        (init.headers as any)["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;
      }
      response = await fetch(input, init);
      if (response.status !== 401) return response;
    }
    // 갱신 실패 또는 재요청도 401 → 로그인 페이지로 이동
    window.location.href = "/";
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    throw new Error("인증이 필요합니다. 다시 로그인해주세요.");
  }
  return response;
}

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

const requestGetDailyMeal = async (getDailyMealDTO: GetDailyMealDTO) => {
  const response = await fetchWithAuthRetry(API_URL + '/api/meal/daily', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify({
      date: getDailyMealDTO.date
    }),
  });
  return response;
}
const requestComment = async (createCommentDto: CreateCommentDTO) => {
  const response = await fetchWithAuthRetry(API_URL + '/api/comment/write', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify(createCommentDto),
    credentials: 'include',
  });
  if (response.ok) {
    return await response.json();
  }
}
const requestMe = async () => {
  const response = await fetchWithAuthRetry(API_URL + "/api/user/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    },
    credentials: "include",
  });
  return response;
}

const requestGetComment = async (meal_id: number) => {
  const response = await fetchWithAuthRetry(API_URL + `/api/comment/${meal_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    },
    credentials: "include",
  });
  if (response.ok) {
    return await response.json() as { results: GetCommentDTO[] };
  }
  return { results: [] };
}

// 급식정보 + 사진 요청
const requestInferenceCalorie = async (meal_id: number, image: File) => {
  const formData = new FormData();
  formData.append('meal_id', meal_id.toString());
  formData.append('image', image);

  try {
    const response = await fetchWithAuthRetry(API_URL + '/api/calorie/inference', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData,
      credentials: "include",
    });

    if (response.ok) {
      return await response.json() as CalorieData;
    } else {
      const errorData = await response.json();
      console.error('API Error:', errorData.error);
      return null;
    }
  } catch (error) {
    console.error('Fetch failed:', error);
    return null;
  }
}

const requestWeeklyTimetable = async (date: string) => {
  const response = await fetchWithAuthRetry(API_URL + "/api/timetable/weekly", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify({ date }),
    credentials: "include",
  });
  return response;
};

export {
  requestLogin,
  requestRegister,
  requestSearchSchool,
  requestGetDailyMeal,
  requestCheckToken,
  requestRefresh,
  requestLogout,
  requestComment,
  requestGetComment,
  requestMe,
  requestInferenceCalorie,
  requestWeeklyTimetable
}