import React, { useEffect } from "react";
import styled from "styled-components";
const acts = require("/public/acts.json");
const SelectBoxWrapper = styled.div`
  position: relative;
  margin: 2px;
  background: linear-gradient(135deg, #11e7df 0%, #39f 50%, #b490ca 100%);
  overflow: hidden;
  border-radius: 0.25em;
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    right: 8px;
    width: 0;
    height: 0;
    margin-top: -2px;
    border-top: 5px solid #11e7df;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
  }
`;
const ActsSelectBox = styled.select`
  /* background-color: "${(props) =>
    props.bgColor ? props.bgColor : "white"}";
  color: "${(props) => (props.color ? props.color : "gray")}"; */
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  background: linear-gradient(135deg, #11e7df 0%, #39f 50%, #b490ca 100%);
  color: black;
  /* background: #ef3c39; */
  /* background-image: none; */
  flex: 1;
  height: 30px;
  vertical-align: middle;
  padding: -10px 0 0 10px;
  color: #333;
  cursor: pointer;
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
