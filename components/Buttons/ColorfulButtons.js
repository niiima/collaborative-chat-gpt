import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  /* height: 500px; */
  margin: 0;
  padding: 0;
  /* height: 100%; */
  width: 100%;
  overflow: hidden;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #c3cfe2;
`;

const ButtonContainer = styled.div`
  /* width: 320px; */

  overflow: visible;
  pointer-events: auto;
  transform-origin: 50% 50% 0px;
  border-radius: 5px;
  color: white;
  line-height: 30px; /* this define height of objects*/
  padding-left: 32px;
  font-size: 14.5px;
  background: lightblue;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 10px;
  &:first-of-type {
    margin-top: 50px;
  }
`;

const ButtonContent = styled.div`
  padding-top: 10px;
  position: relative;
  width: 100%;
  //height: 40px;
  & > div:nth-child(1) {
    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  }
  & > div:nth-child(2) {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  & > div:nth-child(3) {
    background: linear-gradient(135deg, #5ee7df 0%, #b490ca 100%);
  }
  & > div:nth-child(4) {
    background: linear-gradient(135deg, #03c0e2 0%, #c3cfe2 100%);
  }
  & > div:nth-child(5) {
    background: linear-gradient(135deg, #c3cfe2 0%, #123699 100%);
  }
  & > div:nth-child(6) {
    background: linear-gradient(135deg, #9e29a1 0%, #0d20e3 100%);
  }
  & > div:nth-child(7) {
    background: linear-gradient(135deg, #14e236 0%, #16a2b6 100%);
  }
`;

function ColorfulButtonSet({ items }) {
  const itemsArray = [1, 2, 3, 4, 5, 6, 7];
  return (
    <ButtonWrapper>
      {/* <ButtonContainer> */}
      <ButtonContent style={{ height: `${itemsArray.length * 40}px` }}>
        {[...Object.keys(items)].map((item, i) => (
          <ButtonContainer key={`item-${itemsArray[i]}`}>
            <div>
              {item} :{items[item]}
            </div>
          </ButtonContainer>
        ))}
      </ButtonContent>
    </ButtonWrapper>
  );
}

export default ColorfulButtonSet;
