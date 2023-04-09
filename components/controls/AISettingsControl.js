import { useContext } from "react";
import { useControls } from "leva";
import AIContext from "../../context/AIContext";
import ColorfulButtonSet from "../Buttons/ColorfulButtons";

const engines = [
  {
    type: "classic",
    engines: [
      "text-davinci-003",
      "text-curie-001",
      "text-babbage-001",
      "text-ada-001",
    ],
  },
  {
    type: "new",
    engines: ["gpt-3.5-turbo", "gpt-3.5-turbo-0301"],
  },
];
export default function ChatSettingsControl({ aiType = "basic" }) {
  const { AIstate, setAIState, activeEngine } = useContext(AIContext);

  const {
    // engine,
    max_tokens,
    temperature,
    top_p,
    frequency_penalty,
    presence_penalty,
  } = useControls({
    // engine: {
    //   options: engines.find((engine) => engine.type === aiType).engines,
    //   onChange: (value) => setAIState({ engine: value }),
    // },
    max_tokens: {
      value: 150, //2048,
      step: 1,
      max: 4000, //activeEngine.maxTokens, //2048,
      min: 0,
      onChange: (value) => setAIState({ max_tokens: value }),
    },
    temperature: {
      value: 0.9,
      step: 0.01,
      max: 2,
      min: 0,
      onChange: (value) => setAIState({ temperature: value }),
    },
    top_p: {
      value: 1,
      step: 0.01,
      max: 1,
      min: 0,
      onChange: (value) => setAIState({ top_p: value }),
    },
    frequency_penalty: {
      value: 0,
      step: 0.01,
      max: 2,
      min: -2,
      onChange: (value) => setAIState({ frequency_penalty: value }),
    },
    presence_penalty: {
      value: 0.6,
      step: 0.01,
      max: 2,
      min: -2,
      onChange: (value) => setAIState({ presence_penalty: value }),
    },
  });

  return <ColorfulButtonSet items={AIstate}></ColorfulButtonSet>;
}
