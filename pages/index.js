import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { experimentalEngines as engines } from "../model/model.js";
// import ChatComponent from "../components/ChatComponent";
import ChatContext from "../context/ChatContext.js";
import AIContext from "../context/AIContext.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import ChatSettingsControl from "../components/controls/AISettingsControl";
import Header from "../components/Header/Header.js";
import UIContext from "../context/UIContext.js";
import { FlexItem } from "../components/Atoms/FlexItem.js";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import OrdinaryButton from "../components/Buttons/OrdinaryButton";
import { MdDeleteSweep } from "react-icons/md";
import { GiStopSign } from "react-icons/gi";
import ModeSelector from "../components/AIManipulatingComponents/ModeSelector.js";
import dynamic from "next/dynamic";
import SystemPromptTextArea from "../components/AIManipulatingComponents/SystemPromptTextArea";
import EngineSelector from "../components/AIManipulatingComponents/EngineSelector.js";

const ChatComponent = dynamic(() => import("../components/ChatComponent"), {
  loading: () => (
    <div
      style={{ position: "absolute", left: "43%", top: "48%" }}
      className='loading-spinner'></div>
  ),
});
const ActSelector = dynamic(
  () => import("../components/AIManipulatingComponents/ActSelector.js"),
  {
    loading: () => (
      <div
        style={{ position: "absolute", left: "43%", top: "48%" }}
        className='loading-spinner'></div>
    ),
  }
);
const StopGeneratePromptButton = styled(OrdinaryButton)`
  /* color: red; */
`;

export default function MyPage() {
  const { asideExpanded, setAsideExpand } = useContext(UIContext);

  const {
    chatHistory,
    addToHistory,
    isLoading,
    setIsLoading,
    clearChatHistory,
  } = useContext(ChatContext);

  const { AIstate, setAIState } = useContext(AIContext);
  const [activeEngine, setActiveEngine] = useState(engines[0]);

  const [prompt, setPrompt] = useState("");
  const [systemPrompt, setSystemPrompt] = useState(
    `Assist user for what they might ask, get involve in the conversation and try to provide accurate answers for their questions.`
  );
  const [stream, setStream] = useState("");

  async function handleSubmit(e) {
    const streamTextArray = [];
    const prompt_timestamp = new Date();
    setIsLoading(true);

    try {
      const messages = [{ role: "system", content: systemPrompt }];
      chatHistory.forEach((h) => {
        messages.push({ role: "user", content: h.prompt });
        messages.push({ role: "assistant", content: h.completion });
      });
      messages.push({ role: "user", content: prompt });

      //console.log(AIstate);
      let options = {
        engine: activeEngine.key,
        messages: messages,
        ...AIstate,
      };
      //console.log(options);
      const response = await fetch("/api/generate-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = response.body;
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
        completion: streamTextArray.join(""),
        completion_timestamp: completion_timestamp,
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
      //console.log(chatHistory);
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

  return (
    <div>
      <Head>
        <title>GPT knows the whole Conversation</title>
      </Head>
      <Sidebar show={asideExpanded}>
        <ChatSettingsControl aiType='new' />
        <EngineSelector
          engines={engines}
          changeEngineHandler={(e) => {
            let engineType = e.currentTarget.value;
            setActiveEngine(engines.find((eng) => eng.key === engineType));
          }}></EngineSelector>
        <ModeSelector
          handleChange={(prompt) => {
            clearChatHistory();
            setSystemPrompt(prompt);
          }}></ModeSelector>
        <ActSelector
          color={"#439912"}
          bgColor={"white"}
          onChangeHandler={(prompt) => {
            clearChatHistory();
            setSystemPrompt(prompt);
          }}></ActSelector>
        <SystemPromptTextArea
          value={systemPrompt}
          onChange={(e) =>
            setSystemPrompt(e.currentTarget.value)
          }></SystemPromptTextArea>
        {/* <ColorBoxSelector></ColorBoxSelector> */}
      </Sidebar>
      <Header>
        <FlexItem>
          <OrdinaryButton
            text={""}
            icon={<MdDeleteSweep size='20' color='orange' />}
            handleOnClick={() => clearChatHistory()}></OrdinaryButton>
          {/* <StopGeneratePromptButton
            text={""}
            icon={<GiStopSign size='30' />}
            handleOnClick={() => clearChatHistory()}
          /> */}
        </FlexItem>
      </Header>
      <ChatComponent
        stream={stream}
        prompt={prompt}
        handleSendMessage={handleSubmit}
        handlePromptTextChange={handlePromptChange}
        handleOnClick={() => setAsideExpand(false)}
      />
    </div>
  );
}
