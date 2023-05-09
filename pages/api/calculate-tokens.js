import { encode, decode } from "gpt-3-encoder";

export default async function handler(req, res) {
  // console.log(req.body);
  if (
    typeof req.body.prompt === "string" &&
    typeof req.body.completion === "string"
  ) {
    //console.log(req.body.text);
    const promptCount = encode(req.body.prompt);
    const completionCount = encode(req.body.completion);
    //console.log(response);
    res.status(200).json({
      prompt_tokens: promptCount.length,
      completion_tokens: completionCount.length,
    });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
}
