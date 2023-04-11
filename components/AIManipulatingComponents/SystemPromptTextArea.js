import styled from "styled-components";
const SystemPromptTextArea = styled.textarea`
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
  border: 2px solid lightblue;
  border-radius: 10px;
  font-style: italic;
  font-weight: 500;
  /* color: rgba(0, 0, 0, 0.87); */
  overflow-wrap: anywhere;
  word-break: break-word;
`;
export default SystemPromptTextArea;
