import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req, res) {
  const {
    message,
    engine,
    max_tokens,
    temperature,
    top_p,
    frequency_penalty,
    presence_penalty,
  } = await req.json();
  if (typeof message === "string") {
    //console.log(req.body.messages);
    // const systemPrompt = `I want you to act as JSON generator. just replay in javascript syntax. your response must parse using JSON function without any error. when I will ask for a playlist of music's with or without specific attributes and you will generate an array of objects only contain "name" and "artist" properties. create a list with just 10 tracks. remember you should always have "[" and "]" in your replay even if nothing found. I will use two command: "next" or you will make 10 more, "continue" you will create 10 more at the beginning of the current list. My first task is to generate a playlist of `;
    // const systemPrompt = `"I want you to act as an API endpoint that only returns JSON that starts with '[' and ends with ']' necessarily. It must be contain of objects with 'title' and 'artist' properties and nothing else. If the answer of given prompt was anything other than given syntax means there wasn't any song with given definition or user didn't asked for a playlist at all replay with empty array and don't write any request or instruction.  generated songs array at maximum can have 30 songs and all of them must match the given prompt. If no number defined return a default of 10 songs. Check the prompt in an step by step manner and  and stick to your role that is an API endpoint. don't write explanations. Replay only in JSON format, return '[]' if it's not in the given format.". Start and  `;
    const systemPrompt = `I want you to create a list of songs from given prompt in json format with just "title" and "artist" fields. Don't answer to any question and don't make any explanation, just make the playlist of actual songs or empty array if nothings related found. Try to amaze audience with good taste of music. Now `;
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI ?? ""}`,
        },
        method: "POST",
        body: JSON.stringify({
          model: engine,
          prompt: systemPrompt + message,
          temperature: temperature,
          max_tokens: max_tokens,
          top_p: top_p,
          frequency_penalty: frequency_penalty,
          presence_penalty: presence_penalty,
          n: 1,
          stream: false,
          logprobs: null,
          // stop: "\n",
        }),
      });

      const data = await response.json();
      const generatedPlaylist = data.choices[0].text;

      // console.log(generatedPlaylist);

      // Extract the JSON part from the string
      const startIndex = generatedPlaylist.indexOf("[");

      if (startIndex < 0) {
        return new NextResponse(
          { error: "There Had been no Array in response" },
          {
            status: 400,
          }
        );
      }
      const endIndex = generatedPlaylist.lastIndexOf("]");
      const jsonPart = generatedPlaylist.substring(startIndex, endIndex + 1);

      // Parse the extracted JSON string into a JavaScript object
      const jsonObject = JSON.parse(JSON.stringify(jsonPart));
      if (jsonObject["length"] && jsonObject.length > 0)
        return new NextResponse(jsonObject, {
          status: 200,
        });

      return new NextResponse(
        { error: "Nothing found!" },
        {
          status: 400,
        }
      );
      // console.log("------------------------");
    } catch (error) {
      console.log(error);
      return new NextResponse(
        { error: error.message },
        {
          status: 400,
        }
      );
    }
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
}
