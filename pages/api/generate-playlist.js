const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (typeof req.body.engine === "string") {
    //console.log(req.body.messages);
    const msgs = [
      {
        role: "system",
        content: `I want you to act as JSON generator. add nothing to your response except forwhat that can to parse using JSON function in JavaScript environment without any error. so only replay in JSON format and add nothing to your response. when I will ask for a playlist of music's with or without specific attributes and you will generate an array of objects with "name" and "artist" properties includes 10 tracks with given attributes or random tracks if none specified.`,
      },
      ...req.body.messages,
    ];
    //console.log(msgs);

    try {
      const response = await openai.createChatCompletion({
        model: req.body.engine,
        messages: msgs,
        temperature: req.body.temperature,
        max_tokens: req.body.max_tokens,
        top_p: req.body.top_p,
        frequency_penalty: req.body.frequency_penalty,
        presence_penalty: req.body.presence_penalty,
      });

      const generatedPlaylist = response.data.choices[0].message.content;
      console.log(generatedPlaylist);

      // Extract the JSON part from the string
      const startIndex = generatedPlaylist.indexOf("[");
      const endIndex = generatedPlaylist.lastIndexOf("]");
      const jsonPart = generatedPlaylist.substring(startIndex, endIndex + 1);

      // Parse the extracted JSON string into a JavaScript object
      try {
        const jsonObject = JSON.parse(jsonPart);

        console.log(jsonObject);
        res.status(200).json({
          json: jsonObject,
        });
      } catch (error) {
        console.log(error);
      }
      // console.log("------------------------");
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
}
