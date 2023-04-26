const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (typeof req.body.prompt === "string") {
    //       prompt: `A wet on wet oil painting of ${req.body.prompt} by Bob Ross.`,

    const response = await openai.createImage({
      prompt: `${req.body.prompt}`,
      n: 1,
      size: "512x512",
    });
    console.log(response.data);
    res.status(200).json({ text: response.data.data[0].url });
  } else {
    res.status(200).json({
      text: "https://images.dog.ceo/breeds/ridgeback-rhodesian/n02087394_1722.jpg",
    });
  }
}
