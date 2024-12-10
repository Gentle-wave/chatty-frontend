// socketService.ts
import { io, Socket } from 'socket.io-client';
import type { ChatTypes, MessageType } from 'types/chat';
import { apiUrl } from '~/secret';

// Declare the socket type
let socket: Socket | null = null;

// Define the socket address
const socketAddress = apiUrl


// Initialize the socket connection
export const initSocket = (userId: string, handleNewMessage: (msg: MessageType, id: string) => void): void => {
    socket = io(socketAddress, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        query: {
            userId: userId
        }
    });

    socket.on('connection', () => {
        console.log('Socket connected:', socket?.id);
    });

    socket.on('newMessage', handleNewMessage);

    socket.on('disconnect', () => {
        offAllListeners();
        console.log('Socket disconnected');
    });
};

// Function to turn off all listeners
const offAllListeners = (): void => {
    if (socket) {
        console.log('Listeners have been turned off');
        socket.removeAllListeners();
    }
};

// Export a function to use the socket instance
export const useSocket = (): Socket | null => socket;
