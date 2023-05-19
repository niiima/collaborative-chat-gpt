import { useContext, memo } from "react";
import { useControls } from "leva";
import AIContext from "../../context/AIContext";
import ColorfulButtonSet from "../Buttons/ColorfulButtons";

export default function ChatSettingsControl({ aiType = "basic" }) {
  const { AIstate, setAIState, activeEngine } = useContext(AIContext);

  // const {
  //   max_tokens,
  //   temperature,
  //   top_p,
  //   frequency_penalty,
  //   presence_penalty,
  // } =
  useControls({
    max_tokens: {
      step: 1,
      value: 1024,
      max: 4000,
      min: 0,
      onChange: (value) => setAIState({ max_tokens: value }),
    },
    temperature: {
      value: 1,
      step: 0.01,
      max: 2,
      min: 0,
      onChange: (value) => setAIState({ temperature: value }),
    },
    top_p: {
      value: 0,
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
      value: 0.0,
      step: 0.01,
      max: 2,
      min: -2,
      onChange: (value) => setAIState({ presence_penalty: value }),
    },
  });

  // console.log(max_tokens);

  // setAIState(
  //   max_tokens,
  //   temperature,
  //   top_p,
  //   frequency_penalty,
  //   presence_penalty
  // );

  return memo(<ColorfulButtonSet items={AIstate}></ColorfulButtonSet>);
}
