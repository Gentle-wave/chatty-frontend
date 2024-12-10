import React from 'react';

const EmptyChatRoom: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center space-y-4">
                <h1 className="text-2xl font-semibold text-gray-700">
                    <span className='font-knewave text-5xl'>Welcome to Friend Connect</span><br /><br />
                    No Conversation Selected
                </h1>
                <p className="text-gray-500">
                    Select a user on the left side to start a conversation.
                </p>
            </div>
        </div>
    );
};

export default EmptyChatRoom;
