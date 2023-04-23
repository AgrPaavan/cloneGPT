import adminDb from "@/firebaseAdmin";
import queryCompletions from "@/lib/queryApiCompletions";
import admin from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";
import queryApi from "../../lib/queryApiChat";

import models from "../../models.js";

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

  let type: string;
  models.map((listModels) => {
    if (listModels.list.includes(model)) type = listModels.title;
  });

  let response;
  switch (type!) {
    case "completions":
      response = await queryCompletions(prompt, model);
      break;
    case "chats":
      response = await queryApi(prompt, chatId, model, session);
      break;
    default:
      console.log(`Invalid model: ${model}`);
  }

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
