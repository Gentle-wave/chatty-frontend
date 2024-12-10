import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from './usersActions'; // Import the getUsers asyncThunk
import type { GetUsersResponse, User } from 'types/auth';
import type { ChatTypes } from 'types/chat';

interface UsersState {
    users: ChatTypes[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // You can add other reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            // Handling getUsers
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action: PayloadAction<ChatTypes[]>) => {
                state.loading = false;
                state.users = action.payload // Update the users list
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default usersSlice.reducer;
