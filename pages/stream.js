import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { experimentalEngines as engines } from "../model/model.js";
import { modes, colorArray } from "../model/Content";
import ChatComponent from "../components/ChatComponent";
import ChatContext from "../context/ChatContext.js";
import AIContext from "../context/AIContext.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import ChatSettingsControl from "../components/controls/AISettingsControl";
import Header from "../components/Header/Header.js";
import UIContext from "../context/UIContext.js";
import { FlexItem } from "../components/Atoms/FlexItem.js";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { Typography } from "../components/Atoms/Typography.js";
import OrdinaryButton from "../components/Buttons/OrdinaryButton.js";
import { MdDeleteSweep } from "react-icons/md";
import { GiStopSign } from "react-icons/gi";

const StopGeneratePromptButton = styled(OrdinaryButton)`
  /* color: red; */
`;
const TextArea = styled.textarea`
  margin: 2px;
  box-sizing: border-box;
  flex-grow: 1;
  /* background-color: #c6e3fa; */
  //font-family: Helvetica Neue, Segoe UI, Helvetica, Arial, sans-serif;
  outline: 0;
  border-top: 0 none;
  border-right: 0 none;
  border-bottom: 0 none;
  border-left: 0 none;
  overflow: visible;
  border: 2px solid gold;
  color: rgba(0, 0, 0, 0.87);
  overflow-wrap: anywhere;
  word-break: break-word;
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
    modes[modes.length - 1].prompt
  );
  const [stream, setStream] = useState("");

  async function handleSubmit(e) {
    const streamTextArray = [];
    const prompt_timestamp = new Date();
    setIsLoading(true);

    try {
      const messages = [{ role: "system", content: systemPrompt }];
      chatHistory.forEach((h) => {
        // console.log(h);
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
          const substr = chunkValue.slice(9); // remove assistant from the begining of conversation
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
        chatId: uuidv4(), //data.id,
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

  return (
    <div>
      <Head>
        <title>Chatting</title>
      </Head>
      <Sidebar show={asideExpanded}>
        {" "}
        <ChatSettingsControl aiType='new' />
        <ul style={{ margin: 0, zIndex: 100, backgroundColor: "white" }}>
          {modes.map((mode, i) => (
            <li key={mode.name} style={{ listStyle: "none" }}>
              <Typography
                color={colorArray[i]}
                onClick={() => setSystemPrompt(mode.prompt)}>
                {mode.icon ? mode.icon : "⌫"} {mode.name}
              </Typography>
            </li>
          ))}
        </ul>
        <TextArea
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.currentTarget.value)}></TextArea>
        {/* <ColorBoxSelector></ColorBoxSelector> */}
      </Sidebar>
      <Header>
        {" "}
        <FlexItem>
          <OrdinaryButton
            text={""}
            icon={<MdDeleteSweep size='20' />}
            handleOnClick={() => clearChatHistory()}></OrdinaryButton>
          {/* <StopGeneratePromptButton
            text={""}
            icon={<GiStopSign size='30' />}
            handleOnClick={() => clearChatHistory()}
          /> */}
        </FlexItem>
        <FlexItem>
          Models:{" "}
          <select
            onChange={(e) => {
              let engineType = e.currentTarget.value;
              // console.log(engineType);
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
        stream={stream}
        handleSendMessage={handleSubmit}
        handlePromptTextChange={handlePromptChange}
      />
    </div>
  );
}
