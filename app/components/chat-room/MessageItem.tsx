import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import type { MessageType } from 'types/chat';
import type { RootState } from '~/redux/store';

const MessageItem: React.FC<MessageType> = ({ content, receiver, sender, createdAt, chatRoom, sending }) => {
    const { user } = useSelector((state: RootState) => state.auth)
    const isSentByUser = sender === user?._id

    return (
        <div className={`flex flex-col max-w-[75%] w-fit  ${isSentByUser ? 'ml-auto' : ''} my-2`}>
            <div
                className={`w-full p-3 rounded-full ${isSentByUser ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
            >
                <p className="text-sm">{content}</p>
            </div>
            <p className="text-xs text-gray-400 text-right mt-1">{sending ? "sending..." : moment(createdAt).format('LT')}</p>
        </div>
    );
};

export default MessageItem;
