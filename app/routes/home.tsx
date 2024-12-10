import React, { useEffect } from "react";
import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import ChatList from "~/chat/LeftSide";
import ChatRoom from "~/chat/RightSide";
import { Outlet, redirect } from "react-router";
import store, { type RootState } from "~/redux/store";
import { initSocket, useSocket } from "utils/socket";
import { useDispatch, useSelector } from "react-redux";
import type { MessageType } from "types/chat";
import { addMessage } from "~/redux/chat/chatReducer";


export async function clientLoader() {
  const { auth } = store.getState()

  if (!auth.token) {
    return redirect("/login")
  }
  return {};
}


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Friend Connect" },
    { name: "description", content: "Chat and connect with people" },
  ];
}

export default function Home() {
  const { user } = useSelector((state: RootState) => state.auth)
  const chatList = useSelector((state: RootState) => state.chat.chatList)
  const { users } = useSelector((state: RootState) => state.users)

  const dispatch = useDispatch()


  useEffect(() => {
    if (user && user._id) {
      initSocket(user._id, handleSendMessage);

      return () => {
        const socket = useSocket();
        if (socket) {
          socket.disconnect();
        }
      };
    }
  }, [user]);

  const handleSendMessage = (msg: MessageType, id: string) => {
    const displayUserId = msg.sender === user?._id ? msg.receiver : msg.sender

    const chatIndex = chatList.findIndex(user => {
      if (user._id) return user._id === displayUserId
      return user?.userId === displayUserId
    })
    const userIndex = users.findIndex(user => {
      if (user._id) return user._id === displayUserId
      return user?.userId === displayUserId
    })

    const chat = chatList[chatIndex] ?? users[userIndex] ?? {}

    console.log('chat ind: ', chat)

    dispatch(addMessage({ chatId: displayUserId || '', message: { ...msg, fakeMessageId: id }, chatItem: chat }))
  }

  return (
    <div className="grid grid-cols-10">
      <div className="col-span-4">
        <ChatList />
      </div>
      <div className="col-span-6">
        <Outlet />
      </div>
    </div>
  );
}
