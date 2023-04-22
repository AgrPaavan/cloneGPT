import adminDb from "@/firebaseAdmin";
import query from "@/lib/queryApi";
import admin from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "No prompt provided" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "No chatId provided" });
    return;
  }

  const response = await query(prompt, model);

  const message: Message = {
    text: response || "ChatGPT was unable to answer that!",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "/gpt.svg",
    },
  };

  await adminDb
    .collection("users")
    .doc(session.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message)
    .then(() => console.log("Message added"));

  res.status(200).json({ answer: message.text });
}
