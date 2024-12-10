import { createAsyncThunk } from '@reduxjs/toolkit';
import type { SignupRequest, SignupResponse, LoginRequest, LoginResponse, GetUsersResponse } from 'types/auth';
import { apiUrl } from '~/secret';



export const signup = createAsyncThunk<SignupResponse, SignupRequest>('auth/signup', async (payload, { rejectWithValue }) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await response.json()

        // console.log('signup ; ', data)


        if (data.status === 'success') {
            return data as SignupResponse;
        } else {
            throw new Error(data?.status || "Something went wrong")
        }

    } catch (error: any) {
        console.log('signup error ; ', error.message)
        return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
}
);


export const login = createAsyncThunk<LoginResponse, LoginRequest>('auth/login', async (payload, { rejectWithValue }) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await response.json()

        // console.log('login; ', data)

        if (data.status === 'success') {
            return data as LoginResponse;
        } else {
            throw new Error(data?.message || "Something went wrong");
        }
    } catch (error: any) {
        console.log('login error ; ', error.message)
        return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
});