import React from 'react'
import { Link, NavLink } from 'react-router'
import type { ChatTypes } from 'types/chat'
import { formatCreatedAt } from 'utils/utilsFunctions'

type props = {
    chat: ChatTypes
}

const UserItem = ({ chat }: props) => {

    const room = chat._id || chat.userId
    return (
        <NavLink
            to={`/${room}`}
            className={({ isActive }) => `${isActive ? "bg-gray-100" : ""} flex items-center justify-between p-4 hover:bg-gray-100 cursor-pointer border-b last:border-none`}
        >
            <div className="flex items-center">
                <img
                    src={
                        chat.profilePicture || "https://via.placeholder.com/150?text=Avatar"
                    }
                    alt={chat.username}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                    <h2 className="text-sm font-semibold text-gray-900">
                        {chat.username}
                    </h2>
                    <p className="text-xs text-gray-500 truncate w-44">
                        {chat.message}
                    </p>
                </div>
            </div>
            {/* <div className="text-right">
                <p className="text-xs text-gray-500">{formatCreatedAt(chat.time)}</p>
                {chat.unreadCount > 0 && (
                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                        {chat.unreadCount}
                    </span>
                )}
            </div> */}
        </NavLink>
    )
}

export default UserItem
