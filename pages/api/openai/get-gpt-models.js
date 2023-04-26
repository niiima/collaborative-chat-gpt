const { Configuration, OpenAIApi } = require("openai");
const { flattenAndSort } = require("../../../utils/modelFlattener");
const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  try {
    const { data } = await openai.listModels();
    //console.log(data);
    // if (response.status === "ok") {
    // const flattedArray =
    const flattenedAndSorted = flattenAndSort(data.data);
    console.log(flattenedAndSorted);
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
