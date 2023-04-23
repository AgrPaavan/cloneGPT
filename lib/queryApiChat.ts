import { db } from "@/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Session } from "next-auth";
import { ChatCompletionRequestMessage } from "openai";
import openai from "./chatgpt";

const queryApi = async (
  prompt: string,
  chatId: string,
  model: string,
  session: Session,
) => {
  const q = query(
    collection(db, "users", session?.user?.email!, "chats", chatId, "messages"),
    orderBy("createdAt", "asc"),
  );
  const docData = await getDocs(q);
  let messages: ChatCompletionRequestMessage[] = [];
  docData.forEach((doc) => {
    const name = doc.data().user.name;
    const role = name === "ChatGPT" ? "assistant" : "user";
    const content = doc.data().text;
    messages.push({ role, content });
  });

  const response = await openai
    .createChatCompletion({
      model: model,
      messages: messages,
      temperature: 0.3,
      top_p: 1,
      max_tokens: 100,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].message?.content)
    .catch(
      (err) => `ChatGPT was unable to answer that! (Error: ${err.message})`,
    );

  return response;
};

export default queryApi;
