import openai from "./chatgpt";

const query = async (prompt: string, model: string) => {
  const response = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.3,
      top_p: 1,
      max_tokens: 100,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].text)
    .catch(
      (err) => `ChatGPT was unable to answer that! (Error: ${err.message})`,
    );

  return response;
};

export default query;
