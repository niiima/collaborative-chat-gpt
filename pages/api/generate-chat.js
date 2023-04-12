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

  const payload = {
    model: engine, //"text-davinci-003",
    messages: messages, //prompt,
    temperature: temperature, //0.7,
    top_p: top_p, //1,
    frequency_penalty: frequency_penalty, //0,
    presence_penalty: presence_penalty, //0,
    max_tokens: max_tokens, //200, // max_tokens, //200,
    stream: true,
    n: 1,
    stop: ["assistant", "user"],
  };
  //console.log(messages[messages.length - 1]);

  const stream = await OpenAIChatStream(payload);
  return new Response(stream);
};

export default handler;
