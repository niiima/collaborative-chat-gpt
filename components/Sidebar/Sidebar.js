import React from "react";
// import Items from "./Items";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { AnimatedBox } from "../Atoms/AnimatedBox";
const Wrapper = styled(AnimatedBox)`
  /* background-color: #65f9c1; */

  position: fixed;
  top: 8svh;
  display: flex;
  width: 20em;
  min-height: 92svh;
  /* border-radius: 2px; */
  /* background-color: lightskyblue; */
  background: linear-gradient(135deg, #11e7df 0%, #39f 50%, #b490ca 100%);
  flex-direction: column;
  padding: 0;
  margin-left: 10;
  z-index: 100;
  & > div {
    height: 92svh;
    overflow-y: auto;
  }
  & > div::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background: linear-gradient(320deg, #11e7df 0%, #39f 50%, #b490ca 100%);
  }

  & > div::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  & > div::-webkit-scrollbar-thumb {
    background-color: #0ae;

    background-image: -webkit-gradient(
      linear,
      0 0,
      0 100%,
      color-stop(0.5, rgba(255, 255, 255, 0.2)),
      color-stop(0.5, transparent),
      to(transparent)
    );
  }
`;
const Sidebar = ({ show, children }) => {
  const { left, opacity } = useSpring({
    from: { left: "-100%", opacity: "0" },
    left: show ? "0" : "-100%",
    opacity: show ? "1" : "0",
  });
  return (
    <Wrapper style={{ left: left, opacity: opacity }}>
      <div>{children}</div>
    </Wrapper>
  );
};

export default Sidebar;
