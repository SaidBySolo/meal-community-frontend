import { GetDailyMealDTO } from "./dtos/meal";
import { CreateUserDTO } from "./dtos/user";
import { CreateCommentDTO, GetCommentDTO } from "./dtos/comment";

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
    console.log("보내는 데이터:", createUserDto);
    // 서버로부터 응답이 성공적이면 JSON 형태로 응답을 반환
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

const requestLogout = async () =>{
     const response = await fetch(API_URL + "/api/user/logout", {
        method: "GET",
        credentials: "include",
    });
    return response;
}

const requestComment = async (createCommentDto: CreateCommentDTO) => {
    const response = await fetch(API_URL + '/api/comment/write', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(createCommentDto),
        credentials: 'include',
    });
    console.log("보내는 데이터:", createCommentDto);
    console.log("보내는 DTO:", JSON.stringify(createCommentDto, null, 2));

    if (response.ok) {
        return await response.json() as GetCommentDTO;
    }

    const errorText = await response.text();
    console.error("댓글 작성 실패", response.status, errorText);
    throw new Error(`Failed to create comment: ${response.status} ${errorText}`);
}

const requestGetComment = async (meal_id: number) => {
    const response = await fetch(API_URL + `/api/comment/${meal_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
        credentials: "include",
    });
    if (response.ok) {
        return await response.json() as GetCommentDTO[];
    }
    return [];
}

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
}