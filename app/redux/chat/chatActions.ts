import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ChatTypes, MessageType } from 'types/chat';
import { apiUrl } from '~/secret';


export const fetchUserChatsAndMessages = createAsyncThunk<
    { chatList: ChatTypes[]; chatRoom: { [chatId: string]: { room: string; messages: MessageType[] } } },
    string,
    { rejectValue: string }
>('chat/fetchUserChatsAndMessages', async (token, { rejectWithValue }) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/chat`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            return rejectWithValue(error.message || 'Failed to fetch chats');
        }

        const { data: { chats } } = await response.json();

        const chatRoom: { [chatId: string]: { room: string; messages: MessageType[] } } = {};

        for (const chat of chats) {
            const messagesResponse = await fetch(`${apiUrl}/api/v1/chat/${chat.roomId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!messagesResponse.ok) {
                const error = await messagesResponse.json();
                return rejectWithValue(error.message || 'Failed to fetch messages for a chat');
            }

            const { data: { messages } } = await messagesResponse.json();
            chatRoom[chat.userId] = { room: chat.roomId, messages };
        }

        // console.log('list and message; ', { chatList: chats, chatRoom })
        return { chatList: chats, chatRoom };
    } catch (error: any) {
        console.log('error get cchat list; ', error.message)
        return rejectWithValue(error.message || 'An unknown error occurred');
    }
});
