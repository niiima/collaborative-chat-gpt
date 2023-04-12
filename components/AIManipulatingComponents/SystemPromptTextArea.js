import styled from "styled-components";
const SystemPromptTextArea = styled.textarea`
  /* height: 10svh; */
  box-sizing: border-box;
  flex-grow: 1;
  outline: 0;
  border-top: 0 none;
  border-right: 0 none;
  border-bottom: 0 none;
  border-left: 0 none;
  overflow: visible;
  border: 2px solid lightblue;
  border-radius: 10px;
  font-style: italic;
  font-weight: 500;
  font-size: 11px;
  overflow-wrap: anywhere;
  /* word-break: break-word; */
  padding: 9px;
  text-align: justify;
  max-height: 32svh;
`;
export default SystemPromptTextArea;
