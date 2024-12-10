import React, { useEffect, useRef } from "react";
import type { ChatTypes } from "types/chat";
import { useDispatch, useSelector } from "react-redux";
import UserItem from "~/components/chat-list/UserItem";
import type { AppDispatch, RootState } from "~/redux/store";
import { AnimatePresence, Reorder, motion } from "motion/react";
import { getUsers } from "~/redux/user/usersActions";
import { toggleChatMode } from "~/redux/chat/chatReducer";
import { fetchUserChatsAndMessages } from "~/redux/chat/chatActions";



// export const chatsData: ChatTypes[] = [
//     {
//         _id: "1",
//         username: "Daisorandus",
//         email: "daisy@email.com",
//         message: "Lorem Ipsum is simply dummy text.",
//         isOnline: false,
//         time: "2024-12-01T08:45:00",
//         unreadCount: 23,
//         profilePicture: "https://via.placeholder.com/150", // Replace with actual URL
//     },
//     {
//         _id: "2",
//         username: "Luther",
//         email: "daisy@email.com",
//         message: "Lorem Ipsum is simply dummy text.",
//         isOnline: false,
//         time: "2024-12-02T14:30:00",
//         unreadCount: 0,
//         profilePicture: "https://via.placeholder.com/150",
//     },
//     {
//         _id: "3",
//         username: "@Ram",
//         email: "daisy@email.com",
//         message: "Lorem Ipsum is simply dummy text.",
//         isOnline: false,
//         time: "2024-12-03T20:15:00",
//         unreadCount: 0,
//         profilePicture: "https://via.placeholder.com/150",
//     },
//     {
//         _id: "4",
//         username: "Waxy",
//         email: "daisy@email.com",
//         message: "Lorem Ipsum is simply dummy text.",
//         isOnline: false,
//         time: "2024-12-04T10:00:00",
//         unreadCount: 16,
//         profilePicture: "https://via.placeholder.com/150",
//     },
//     {
//         _id: "5",
//         username: "JohnX",
//         email: "daisy@email.com",
//         message: "Lorem Ipsum is simply dummy text.",
//         isOnline: false,
//         time: "2024-12-05T18:25:00",
//         unreadCount: 0,
//         profilePicture: "https://via.placeholder.com/150",
//     },
//     {
//         _id: "6",
//         username: "@Morsy",
//         email: "daisy@email.com",
//         message: "Lorem Ipsum is simply dummy text.",
//         isOnline: false,
//         time: "2024-12-06T22:45:00",
//         unreadCount: 22,
//         profilePicture: "",
//     },
// ];

const ChatList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()

    const { chatList, chatMode } = useSelector((state: RootState) => state.chat)
    const { user, token } = useSelector((state: RootState) => state.auth)
    const { loading, error, users } = useSelector((state: RootState) => state.users)
    const loader = useRef('unloaded')



    const sortedChatsData = chatMode ? [...chatList].sort((a, b) => {
        const dateA = new Date(a.time).getTime();
        const dateB = new Date(b.time).getTime();
        if (isNaN(dateA)) return 1; // Push inval_id `a.time` to the end
        if (isNaN(dateB)) return -1
        return dateB - dateA;
    }) : users


    useEffect(() => {
        if (token && loader.current === 'unloaded') {
            loader.current = 'loaded'
            dispatch(getUsers(token));  // Dispatch the getUsers action with the token
            dispatch(fetchUserChatsAndMessages(token))
        }
    }, [dispatch, token]);


    // console.log('user; ', users)

    return (
        <div className="h-screen flex justify-center p-4 w-full">
            <div className="w-full max-w-md bg-white rounded-lg flex flex-col overflow-h_idden border border-white">
                {/* User Header */}
                <div className="flex items-center p-4 bg-blue-100">
                    <img
                        src={user?.profilePicture || "https://via.placeholder.com/50"}
                        alt="User Avatar"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                        <h1 className="text-lg font-semibold text-gray-900">{user?.username}</h1>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <button className="ml-auto text-red-500 hover:text-red-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m9 0h-9m9 0a2.25 2.25 0 012.25 2.25v6.75a2.25 2.25 0 01-2.25 2.25h-9A2.25 2.25 0 014.5 18V11.25A2.25 2.25 0 016.75 9h9z"
                            />
                        </svg>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="p-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

                <div className="flex gap-2 items-center pl-4 pb-4">
                    <button
                        onClick={() => dispatch(toggleChatMode(false))}
                        className={`py-1 px-3 text-xs rounded-full bg-emerald-100 hover:bg-emerald-400 ${chatMode ? "" : "bg-emerald-400"}`}
                    >
                        Find Users
                    </button>
                    <button
                        onClick={() => dispatch(toggleChatMode(true))}
                        className={`py-1 px-3 text-xs rounded-full bg-emerald-100 hover:bg-emerald-400 ${chatMode ? "bg-emerald-400" : ""}`}
                    >
                        Chats
                    </button>
                </div>

                {/* Chat List */}
                <div className="overflow-y-auto scrollbar-hide flex-1">
                    {loading ?
                        <p className="">loading users...</p> :

                        <AnimatePresence>
                            {sortedChatsData?.map((chat, index) => (
                                <motion.div
                                    layout
                                    key={chat._id || chat.userId}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <UserItem chat={chat} key={chat._id} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    }
                </div>

            </div>
        </div>
    );
};

export default ChatList;
