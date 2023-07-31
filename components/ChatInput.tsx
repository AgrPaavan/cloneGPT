"use client";

import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useRef, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { toast } from "react-hot-toast";
import useSWR from "swr";
import ModelSelection from "./ModelSelection";

const ChatInput = ({ chatId }: { chatId: string }) => {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");
  const textAreaRef = useRef<HTMLFormElement>(null);

  const { data: model } = useSWR("model", {
    fallbackData: "gpt-3.5-turbo",
  });

  const onEnterPress = (e: any) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  const [title] = useDocumentData(
    doc(db, "users", session?.user?.email!, "chats", chatId),
  );

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name!}}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages",
      ),
      message,
    );

    const notification = toast.loading("Fetching response...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    })
      .then(() => {
        toast.success("Response received!", {
          id: notification,
        });
      })
      .then(async () => {
        if (!title?.title) {
          console.log("updating title");
          await updateDoc(
            doc(db, "users", session?.user?.email!, "chats", chatId),
            {
              title: message.text,
            },
          );
        }
      });
  };

  return (
    <>
      <div className="bg-gray-700 text-gray-400 rounded-lg text-sm">
        <form
          ref={textAreaRef}
          className="p-5 space-x-5 flex"
          onSubmit={(e) => sendMessage(e)}
        >
          <textarea
            autoFocus
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Send a message..."
            className="bg-transparent text-white focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
            disabled={!session}
            onKeyDown={onEnterPress}
          />
          <button
            disabled={!prompt || !session}
            type="submit"
            className="bg-[#11a37f] disabled:hover: hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
          >
            <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
          </button>
        </form>

        <div className="sm:hidden">
          <ModelSelection />
        </div>
      </div>
    </>
  );
};

export default ChatInput;
