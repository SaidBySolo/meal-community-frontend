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

const requestIsValidToken = async (refreshToken: string) => {
    const response = await fetch(API_URL + '/api/user/verify', {
        method: 'GET'
    });

    return response
}

export {
    requestLogin,
    requestRegister
}