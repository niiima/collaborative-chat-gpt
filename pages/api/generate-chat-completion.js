import { OpenAIChatStream } from "./OpenAIChatStream";

export const config = {
  runtime: "edge",
};

const handler = async (req) => {
  const {
    messages,
    engine,
    max_tokens,
    temperature,
    top_p,
    frequency_penalty,
    presence_penalty,
  } = await req.json();

  console.log(messages);
  const payload = {
    model: engine,
    messages: messages,
    temperature: temperature,
    top_p: top_p,
    frequency_penalty: frequency_penalty,
    presence_penalty: presence_penalty,
    max_tokens: max_tokens,
    stream: true,
    n: 1,
    stop: ["assistant:", "user:"],
  };

  const stream = await OpenAIChatStream(payload);
  return new Response(stream);
};

export default handler;
