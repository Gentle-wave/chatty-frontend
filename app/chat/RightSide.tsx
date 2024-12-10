import React, { useState, useEffect, useRef } from 'react';
import MessageItem from '~/components/chat-room/MessageItem';
import type { ChatTypes, MessageType as Message } from 'types/chat';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '~/redux/store';
import { addMessage, createRoom } from '~/redux/chat/chatReducer';
import { useSocket } from 'utils/socket';
import { AnimatePresence, motion } from 'motion/react';

const ChatRoom = ({ params }: { params: { roomId: string } }) => {
    const socket = useSocket()
    const { roomId } = params ?? {}

    const dispatch = useDispatch()
    const { users } = useSelector((state: RootState) => state.users)
    const { user } = useSelector((state: RootState) => state.auth)
    const chatRoom = useSelector((state: RootState) => state.chat.chatRoom[roomId])
    const { messages, room } = chatRoom ?? {}
    const chatList = useSelector((state: RootState) => state.chat.chatList)
    const chatIndex = chatList.findIndex(user => {
        if (user._id) return user._id === roomId
        return user?.userId === roomId
    })
    const userIndex = users.findIndex(user => {
        if (user._id) return user._id === roomId
        return user?.userId === roomId
    })
    const chat = chatList[chatIndex] ?? users[userIndex] ?? {}
    const { username, profilePicture } = chat
    const inputRef = useRef<HTMLInputElement>(null)

    // const [messages, setMessages] = useState<Message[]>([]);

    const [text, setText] = useState('');

    const handleSendMessage = () => {
        if (text.trim() === '') return;
        if (!user) return

        const newMessage: Message = {
            _id: Date.now().toString(),
            chatRoom: "",
            content: text,
            sender: user?._id,
            receiver: roomId,
            sending: true,
            createdAt: '',
        };

        // console.log('f roomID ;', roomId)

        dispatch(addMessage({ chatId: roomId, message: newMessage, isMine: true, chatItem: chat }))

        if (room) {
            socket?.emit('sendMessage', {
                chatRoomId: room,
                senderId: user._id,
                receiverId: roomId,
                content: newMessage.content,
                fakeMessageId: newMessage._id,
            });
        }
        // setMessages([...messages, newMessage]);
        setText('');
    };


    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }

        if (!room && socket && user) {
            socket.emit('getRoom', { user1: roomId, user2: user._id }, ({ roomId: room }: { roomId: string }) => {
                console.log('the room id : ', room)
                dispatch(createRoom({ chatId: roomId, room: room }))
            });
        }

    }, [roomId, socket])

    console.log('mesage: ', messages)


    return (
        <div className="flex flex-col h-screen w-full bg-gray-100 p-4">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-4 shadow">
                <h1 className="text-lg font-semibold">{username}</h1>
                <div className="flex space-x-2">
                    <button className="text-blue-500">📞</button>
                    <button className="text-blue-500">📷</button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 flex flex-col justify-end overflow-y-auto my-4 space-y-2 scrollbar-hide">
                <AnimatePresence>
                    {messages?.map((message, index) => (
                        <motion.div
                            layout
                            key={message._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, }}
                        >
                            <MessageItem
                                key={message._id}
                                _id={message._id}
                                content={message.content}
                                chatRoom={message.chatRoom}
                                sender={message.sender}
                                receiver={message.receiver}
                                createdAt={message.createdAt}
                                sending={message.sending}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Input Field */}
            <div className="flex items-center space-x-2 bg-white p-4 shadow">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type a message..."
                    autoFocus
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                        // Check if the key pressed is Enter (keyCode 13)
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Send
                </button>
            </div>

        </div>
    );
};

export default ChatRoom;
