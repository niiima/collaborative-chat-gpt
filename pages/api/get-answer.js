const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (
    typeof req.body.prompt === "string" &&
    typeof req.body.engine === "string" &&
    typeof req.body.maxTokens === "number"
  ) {
    const response = await openai.createCompletion({
      model: req.body.engine,
      prompt: req.body.prompt,
      temperature: 0,
      max_tokens: req.body.maxTokens,
    });
    //console.log(response.data);
    res.status(200).json({
      id: response.data.id,
      text: response.data.choices[0].text,
      usage: {
        prompt_tokens: response.data.usage.prompt_tokens,
        completion_tokens: response.data.usage.completion_tokens,
        total_tokens: response.data.usage.total_tokens,
      },
      created: response.data.created,
    });
    //res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
}
