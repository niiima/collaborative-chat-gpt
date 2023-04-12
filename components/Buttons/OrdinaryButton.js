import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button`
  margin: auto;
  font-weight: bolder;
  /* background-color: #03c0e2; */
  border: none;
  cursor: pointer;
  padding: 8px 6px;
  border-radius: 4px;
  box-shadow: 1px 1px #b490ca;

  &:hover {
    background-color: #b490ca;
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
