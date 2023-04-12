import { useState, useContext, useRef, useEffect } from "react";
import Head from "next/head";
import { engines } from "../model/model.js";
import ChatContext from "../context/ChatContext.js";
import AIContext from "../context/AIContext.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import ChatSettingsControl from "../components/AIManipulatingComponents/AISettingsControl.js";
import Header from "../components/Header/Header.js";
import UIContext from "../context/UIContext.js";
import { v4 as uuidv4 } from "uuid";
import EngineSelector from "../components/AIManipulatingComponents/EngineSelector.js";
// import RangeField from "../components/controls/RangeField.js";
import ColorfulButtonSet from "../components/Buttons/ColorfulButtons.js";
import GroupRadioButtons from "../components/Inputs/GroupRadio/GroupRadioButtons";

import dynamic from "next/dynamic";

const ChatComponent = dynamic(() => import("../components/ChatComponent"), {
  loading: () => (
    <div
      style={{ position: "absolute", left: "43%", top: "48%" }}
      className='loading-spinner'></div>
  ),
});

export default function MyPage() {
  const { asideExpanded, setAsideExpand } = useContext(UIContext);

  const { chatHistory, addToHistory, isLoading, setIsLoading } =
    useContext(ChatContext);

  const { AIstate, setAIState } = useContext(AIContext);

  const [activeEngine, setActiveEngine] = useState(engines[0]);
  const [prompt, setPrompt] = useState("");

  const [stream, setStream] = useState("");

  async function handleSubmit(e) {
    const streamTextArray = [];
    const prompt_timestamp = new Date();
    setIsLoading(true);

    try {
      let options = {
        prompt,
        ...AIstate,
        engine: activeEngine.key,
      };
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });
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
          const substr = chunkValue.slice(9); // remove assistant from the beginning of conversation
          setStream((prev) => prev + substr);
          streamTextArray.push(substr);
        } else {
          setStream((prev) => prev + chunkValue);
          streamTextArray.push(chunkValue);
        }
      }

      const completion_timestamp = new Date();
      const completion = streamTextArray.join("");

      const tokenCountResult = await fetch("/api/calculate-tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, completion }),
      });

      const { prompt_tokens, completion_tokens } =
        await tokenCountResult.json();

      addToHistory({
        chatId: uuidv4(),
        prompt: prompt,
        prompt_timestamp: prompt_timestamp,
        completion: streamTextArray.join(""), //data.text.trim(),
        completion_timestamp: completion_timestamp, //data.created,
        engine: activeEngine.key,
        prompt_tokens: prompt_tokens,
        completion_tokens: completion_tokens,
        prompt_price: (
          (prompt_tokens / 1000) *
          activeEngine.costPerKiloToken
        ).toFixed(5),
        completion_price: (
          (completion_tokens / 1000) *
          activeEngine.costPerKiloToken
        ).toFixed(5),
      });

      setStream("");
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

  // useEffect(() => {}, [setAsideExpand]);

  return (
    <div>
      <Head>
        <title>GPT 3 Models are super fast</title>
      </Head>
      <Sidebar show={asideExpanded}>
        {/* <RangeField val={150} min={0} max={4000} step={1}></RangeField> */}
        <ChatSettingsControl aiType='classic' />
        {/* <EngineSelector
          engines={engines}
          changeEngineHandler={(e) => {
            let engineType = e.currentTarget.value;
            setActiveEngine(engines.find((eng) => eng.key === engineType));
          }}></EngineSelector> */}
        <GroupRadioButtons
          items={[
            ...engines.map((engine) => {
              return {
                text: engine.name,
                value: engine.key,
                isActive: engine.key === activeEngine.key,
              };
            }),
          ]}
          changeHandler={(e) =>
            setActiveEngine(engines.find((eng) => eng.key === e))
          }></GroupRadioButtons>
        <ColorfulButtonSet items={AIstate}></ColorfulButtonSet>
      </Sidebar>
      <Header></Header>
      <ChatComponent
        prompt={prompt}
        stream={stream}
        handleSendMessage={handleSubmit}
        handlePromptTextChange={handlePromptChange}
        handleOnClick={() => setAsideExpand(false)}
      />
    </div>
  );
}
