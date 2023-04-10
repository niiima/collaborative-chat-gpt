import React from "react";
import styled from "styled-components";
// "fda085",
// "#b490ca",
// "#03c0e2",
const ButtonWrapper = styled.button`
  margin: auto;
  font-weight: bolder;
  background-color: #b490ca;
  border: none;
  cursor: pointer;
  padding: 8px 6px;
  border-radius: 4px;
  box-shadow: 1px 1px #03c0e2;

  &:hover {
    background-color: #03c0e2;
  }
`;

export default function OrdinaryButton({ text, handleOnClick, icon }) {
  return (
    <ButtonWrapper type='button' onClick={() => handleOnClick()}>
      {icon}
      {text}
    </ButtonWrapper>
  );
}
