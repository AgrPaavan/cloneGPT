import openai from "@/lib/chatgpt";
import { NextApiRequest, NextApiResponse } from "next";

import models from "../../models.js";
const includeModels = ["completions", "chats"];

type Option = {
  value: string;
  label: string;
};

type Data = {
  modelOptions: Option[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const fetchModels = (await openai.listModels()).data.data;
  const availableModels = fetchModels.map((model) => model.id);

  const modelOptions: Option[] = [];

  models.map((model) => {
    if (includeModels.includes(model.title)) {
      model.list.map((title) => {
        if (availableModels.includes(title)) {
          modelOptions.push({
            value: title,
            label: title,
          });
        }
      });
    }
  });

  res.status(200).json({ modelOptions });
}
