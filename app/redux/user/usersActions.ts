import { createAsyncThunk } from "@reduxjs/toolkit";
import type { GetUsersResponse } from "types/auth";
import type { RootState } from "../store";
import type { ChatTypes } from "types/chat";
import { apiUrl } from "~/secret";


export const getUsers = createAsyncThunk<ChatTypes[], string>('users/getAll', async (token, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState
    try {
        const response = await fetch(`${apiUrl}/api/v1/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
            },
        });

        if (!response.ok) {
            const error = await response.json();
            return rejectWithValue(error);
        }

        const data = await response.json() as GetUsersResponse;

        console.log('data; ', data)
        if (data.status === 'success') {
            const users = data.data.users.filter(user => user._id !== auth.user?._id)
            return users;
        } else {
            throw new Error(data?.status || "Something went wrong");
        }
    } catch (error: any) {
        return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
});