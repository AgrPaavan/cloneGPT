"use client";

import { db } from "@/firebase";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { collection, doc, orderBy, query, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";

const Chat = ({ chatId }: { chatId: string }) => {
  const { data: session } = useSession();

  const scrollBottom = useRef<null | HTMLDivElement>(null);

  const [messages, loading, error] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages",
        ),
        orderBy("createdAt", "asc"),
      ),
  );

  useEffect(() => {
    scrollBottom?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">
            Type a prompt in below to get started
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}
      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))}
      <div ref={scrollBottom} />
    </div>
  );
};

export default Chat;
