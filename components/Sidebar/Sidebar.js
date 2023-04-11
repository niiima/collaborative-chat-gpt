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
  height: 92svh;
  /* border-radius: 2px; */
  background-color: lightskyblue;
  flex-direction: column;
  padding: 0;
  margin-left: 10;
  z-index: 100;
`;
const Sidebar = ({ show, children }) => {
  const { left, opacity } = useSpring({
    from: { left: "-100%", opacity: "0" },
    left: show ? "0" : "-100%",
    opacity: show ? "1" : "0",
  });
  return <Wrapper style={{ left: left, opacity: opacity }}>{children}</Wrapper>;
};

export default Sidebar;
