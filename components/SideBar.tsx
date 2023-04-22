"use client";

import { db } from "@/firebase";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { collection, orderBy, query } from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import NewChat from "./NewChat";

const SideBar = () => {
  const { data: session } = useSession();

  const [chats, loading, erorr] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc"),
      ),
  );

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat />

          <div className="hidden sm:inline">
            <ModelSelection />
          </div>
        </div>

        <div className="flex flex-col space-y-2 my-2">
          {loading && <p className="text-white">Loading...</p>}

          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>
      </div>

      {session && (
        <div className="flex flex-row md:flex-col items-center justify-center">
          <button className="md:hidden p-2 block text-white hover:text-black duration-75">
            <ArrowLeftOnRectangleIcon className="h-12 w-12" />
          </button>
          <img
            src={session.user?.image!}
            alt="profile picture"
            className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2"
          />
          <button
            onClick={() => signOut()}
            className="hidden md:flex flex-row p-2 items-center justify-center text-white border rounded-lg hover:text-black hover:bg-white duration-75 w-full"
          >
            <ArrowLeftOnRectangleIcon className="h-8 w-8" />
            <span>Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SideBar;
