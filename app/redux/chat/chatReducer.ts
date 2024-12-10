import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ChatTypes, MessageType } from "types/chat";
import { fetchUserChatsAndMessages } from "./chatActions";

export interface ChatState {
    chatMode: boolean;
    chatList: ChatTypes[];
    chatRoom: {
        [chatId: string]: {
            room: string;
            messages: MessageType[]
        }; // Mapping of chat IDs to their respective messages
    };
}

const initialState: ChatState = {
    chatMode: false,
    chatList: [],
    chatRoom: {},
};


const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {

        toggleChatMode: (state, action: PayloadAction<boolean>) => {
            state.chatMode = action.payload
        },
        createRoom: (state, action: PayloadAction<{ chatId: string; room: string }>) => {
            const { chatId, room } = action.payload

            state.chatRoom[chatId] = {
                room: room,
                messages: []
            }
        },
        // Action to add a new message to a specific chat room
        addMessage: (state, action: PayloadAction<{ chatId: string; message: MessageType, isMine?: boolean, chatItem: ChatTypes }>) => {
            const { chatId, message, isMine, chatItem } = action.payload;

            if (!state.chatRoom[chatId]) {
                state.chatRoom[chatId] = {
                    room: '',
                    messages: []
                }
            } else if (!state.chatRoom[chatId].messages) {
                state.chatRoom[chatId].messages = []
            }
            // Add the message to the specific chat room
            const index = state.chatRoom[chatId].messages.findIndex(chat => chat._id === message.fakeMessageId)
            if (index !== -1) {
                state.chatRoom[chatId].messages[index] = message
            } else {
                state.chatRoom[chatId].messages.push(message);
            }

            // Update the last message and time in the chatList
            const chat = state.chatList.find((chat) => {
                if (chat._id) return chat._id === chatId
                return chat.userId === chatId
            });

            if (isMine) {
                state.chatMode = true
            }
            console.log('the chat ;', chat)
            if (chat) {
                chat.message = message.content;
                chat.time = message.timestamp;
                // if (!message.isSentByUser) {
                //     chat.unreadCount += 1;
                // }
            } else {
                const newChat: ChatTypes = {
                    ...chatItem,
                    message: message.content,
                    time: message.timestamp,
                    // ...(!message.isSentByUser ? { unreadCount: 1 } : {})
                }
                state.chatList.push(newChat)
            }
        },

        // Action to mark messages as read in a specific chat room
        // markMessagesAsRead: (state, action: PayloadAction<{ chatId: string }>) => {
        //     const { chatId } = action.payload;

        //     const chat = state.chatList.find((chat) => chat._id === chatId);
        //     if (chat) {
        //         chat.unreadCount = 0; // Reset unread count
        //     }
        // },

        // Action to initialize or update the chat list
        setChatList: (state, action: PayloadAction<ChatTypes[]>) => {
            state.chatList = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchUserChatsAndMessages.pending, (state) => {
                // You can handle a loading state here if needed
            })
            .addCase(fetchUserChatsAndMessages.fulfilled, (state, action) => {
                state.chatList = action.payload.chatList;
                state.chatRoom = action.payload.chatRoom;
            })
            .addCase(fetchUserChatsAndMessages.rejected, (state, action) => {
                console.error('Error fetching chats and messages:', action.payload);
            });
    },
});

export const { addMessage, setChatList, toggleChatMode, createRoom } = chatSlice.actions;

export default chatSlice.reducer;