
export interface ChatTypes {
    _id: string;
    roomId: string;
    userId: string;
    username: string;
    profilePicture?: string;
    message: string;
    time: string;
}

export interface MessageType {
    _id: string;
    chatRoom: string;
    content: string;
    sender: string;
    receiver: string;
    sending?: boolean;
    createdAt: string;
    fakeMessageId?: string
}