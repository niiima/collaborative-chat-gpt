import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { engines } from "../model/model.js";
import ChatComponent from "../components/ChatComponent";
import ChatContext from "../context/ChatContext.js";
import AIContext from "../context/AIContext.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import ChatSettingsControl from "../components/controls/AISettingsControl";
import Header from "../components/Header/Header.js";
import UIContext from "../context/UIContext.js";
import { FlexItem } from "../components/Atoms/FlexItem.js";
import { v4 as uuidv4 } from "uuid";

export default function MyPage() {
  const { asideExpanded, setAsideExpand } = useContext(UIContext);

  const { chatHistory, addToHistory, isLoading, setIsLoading } =
    useContext(ChatContext);

  const { AIstate, setAIState } = useContext(AIContext);

  const [activeEngine, setActiveEngine] = useState(engines[0]);
  const [prompt, setPrompt] = useState("");
  // const [activeEngine, setActiveEngine] = useState({
  //   ...engines[0],
  // });

  const [stream, setStream] = useState("");
  const [completedStream, setCompletedStream] = useState("");

  async function handleSubmit(e) {
    const streamTextArray = [];
    const prompt_timestamp = new Date();
    setIsLoading(true);

    try {
      let options = {
        prompt,
        ...AIstate,
        engine: activeEngine.key,
        // max_tokens: activeEngine.maxTokens,
      };
      console.log(options);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = response.body; //await response.json();

      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      let init = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        const chunkValue = decoder.decode(value);

        if (init === false) {
          init = true;
          const substr = chunkValue.slice(9); // remove assistant from the begining of conversation
          setStream((prev) => prev + substr);
          streamTextArray.push(substr);
        } else {
          setStream((prev) => prev + chunkValue);
          streamTextArray.push(chunkValue);
        }
      }

      const completion_timestamp = new Date();
      addToHistory({
        chatId: uuidv4(), //data.id,
        prompt: prompt,
        prompt_timestamp: prompt_timestamp,
        completion: streamTextArray.join(""), //data.text.trim(),
        completion_timestamp: completion_timestamp, //data.created,
        engine: activeEngine.key,
        //prompt_tokens: data.usage.prompt_tokens,
        //completion_tokens: data.usage.completion_tokens,
        // prompt_price: (
        //   (data.usage.prompt_tokens / 1000) *
        //   activeEngine.costPerKiloToken
        // ).toFixed(5),
        // completion_price: (
        //   (data.usage.completion_tokens / 1000) *
        //   activeEngine.costPerKiloToken
        // ).toFixed(5),
      });

      setStream("");
      console.log(chatHistory);
      setPrompt("");
    } catch {
      (err) => console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handlePromptChange(e) {
    let trimPrompt = e.trim();
    if (trimPrompt.length > 0) {
      setPrompt(trimPrompt);
    }
  }

  return (
    <div>
      <Head>
        <title>Messaging</title>
      </Head>
      <Sidebar show={asideExpanded}>
        {" "}
        <ChatSettingsControl aiType='classic' />
        {/* <ColorBoxSelector></ColorBoxSelector> */}
      </Sidebar>
      <Header>
        <FlexItem>
          Models:{" "}
          <select
            onChange={(e) => {
              let engineType = e.currentTarget.value;
              setActiveEngine(engines.find((eng) => eng.key === engineType));
            }}>
            {engines.map((eng) => (
              <option key={eng.id} value={eng.key}>
                {eng.name}
              </option>
            ))}
          </select>
        </FlexItem>
      </Header>
      <ChatComponent
        //
        stream={stream}
        handleSendMessage={handleSubmit}
        handlePromptTextChange={handlePromptChange}
      />
    </div>
  );
}
