import { useState } from "react";
import Header from "../components/Header/Header";
import { Typography } from "../components/Atoms/Typography";
import styled from "styled-components";

const Question = styled(Typography)`
  width: 300px;
  white-space: no-wrap;
  margin-top: 20px;
  /* height: 1rem; */
`;
export default function MyPage() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/openai/get-painting", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });
    const data = await response.json();
    setAnswer(data.text);
    setIsLoading(false);
  }

  function handleChange(e) {
    setPrompt(e.target.value);
  }

  return (
    <div>
      <Header>
        <Question color='white'>What to paint?</Question>
      </Header>

      <form className='our-form' onSubmit={handleSubmit}>
        <input className='prompt-field' type='text' onChange={handleChange} />
        <button className='prompt-button'>Go!</button>
      </form>

      {isLoading && (
        <div
          style={{ position: "absolute", left: "43%", top: "48%" }}
          className='loading-spinner'></div>
      )}

      {isLoading == false && <img src={answer} alt={prompt} />}
    </div>
  );
}
