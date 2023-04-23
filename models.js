const models = [
  {
    title: "chats",
    list: [
      "gpt-4",
      "gpt-4-0314",
      "gpt-4-32k",
      "gpt-4-32k-0314",
      "gpt-3.5-turbo",
      "gpt-3.5-turbo-0301",
    ],
  },

  {
    title: "completions",
    list: [
      "text-davinci-002",
      "text-davinci-003",
      "text-curie-001",
      "text-babbage-001",
      "text-ada-001",
    ],
  },
  {
    title: "edits",
    list: ["text-davinci-edit-001", "code-davinci-edit-001"],
  },
  {
    title: "transcriptions",
    list: ["whisper-1"],
  },
  {
    title: "translations",
    list: ["whisper-1"],
  },
  {
    title: "fine-tunes",
    list: ["davinci", "curie", "babbage", "ada"],
  },
  {
    title: "embeddings",
    list: ["text-embedding-ada-002", "text-search-ada-doc-001"],
  },
  {
    title: "moderations",
    list: ["text-moderation-stable", "text-moderation-latest"],
  },
];

export default models;
