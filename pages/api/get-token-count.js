import { encode, decode } from "gpt-3-encoder";

export default async function handler(req, res) {
  //console.log(req.body);
  if (typeof req.body.text === "string") {
    //console.log(req.body.text);
    const response = encode(req.body.text); //.length;
    //console.log(response);
    res.status(200).json({ text: response.length });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
}
