import type { ChatTypes } from "./chat";

export interface User {
    _id: string;
    email: string;
    username: string;
    dateOfBirth: string;
    gender: string;
    profilePicture?: string | null;
}

export interface SignupRequest {
    email: string;
    username: string;
    password: string;
    dateOfBirth: string;
    gender: string;
    profilePicture?: string;
}

export interface SignupResponse {
    status: string;
    token: string;
    data: {
        user: User
    };
}


export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    status: string;
    token: string;
    data: {
        user: User
    };
}

export interface GetUsersResponse {
    status: string;
    data: {
        users: ChatTypes[];
    }
}