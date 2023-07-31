import { db } from "@/firebase";
import {
  ChatBubbleLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";

const ChatRow = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages"),
  );

  const [title] = useDocumentData(
    doc(db, "users", session?.user?.email!, "chats", id),
  );

  const deleteChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  const editTitle = async () => {
    const newTitle = prompt("Enter a new title for this chat");

    await updateDoc(doc(db, "users", session?.user?.email!, "chats", id), {
      title: newTitle,
    });
  };

  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname]);

  return (
    <Link
      href={`chat/${id}`}
      className={`chatRow justify-center ${active && "bg-gray-700/50"}`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="flex-1 hidden md:inline-flex truncate">
        {/* {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"} */}
        {title?.title || "New Chat"}
      </p>
      <PencilSquareIcon
        onClick={editTitle}
        className="h-5 w-5 text-gray-400 hover:text-white duration-75"
      />
      <TrashIcon
        onClick={deleteChat}
        className="h-5 w-5 text-gray-400 hover:text-red-700 duration-75"
      />
    </Link>
  );
};

export default ChatRow;
