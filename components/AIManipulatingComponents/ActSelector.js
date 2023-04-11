import React, { useEffect } from "react";
import styled from "styled-components";
const acts = require("/public/acts.json");
const SelectBoxWrapper = styled.div`
  position: relative;
  /* display: flex; */
  /* width: 5m; */
  height: 3em;
  line-height: 3;
  background: #5c6664;
  overflow: hidden;
  border-radius: 0.25em;
`;
const ActsSelectBox = styled.select`
  background-color: "${(props) => (props.bgColor ? props.bgColor : "white")}";
  color: "${(props) => (props.color ? props.color : "gray")}";
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  background: #5c6664;
  /* background-image: none; */
  flex: 1;
  padding: 0 0.5em;
  color: #fff;
  cursor: pointer;
  font-size: 1em;
`;
const ActSelector = ({ color, bgColor, onChangeHandler }) => {
  // useEffect(() => {
  //   console.log(acts);
  // }, []);
  return (
    <SelectBoxWrapper>
      <ActsSelectBox
        color={color}
        bgColor={bgColor}
        onChange={(e) => onChangeHandler(e.currentTarget.value)}>
        {acts.map((act, i) => (
          <option key={`act_${i}`} value={act.prompt}>
            {act.act}
          </option>
        ))}
      </ActsSelectBox>
    </SelectBoxWrapper>
  );
};

export default ActSelector;
