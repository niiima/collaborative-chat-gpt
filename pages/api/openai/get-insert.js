const { Configuration, OpenAIApi } = require("openai");
// just a sample not suppose to work
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export default async function handler(req, res) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "I am sending my ",
      suffix: " to you my dear Susan.",
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.status(200).json({ data: flattenedAndSorted });
    //}
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}
