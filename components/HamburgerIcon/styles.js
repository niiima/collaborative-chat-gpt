import styled from "styled-components";

export const MenuLabel = styled.label`
  background-color: transparent;
  border-radius: 10px;
  height: 1.5rem;
  width: 2rem;
  cursor: pointer;
  z-index: 100000;
  /* text-align: center; */
  /* transform: scale(0.5); */
  margin-top: 4svh;
  margin-left: 2vw;
`;

export const Icon = styled.span`
  position: relative;
  background-color: ${(props) =>
    props.clicked
      ? "transparent"
      : `${props["color"] ? props.color : "white"}`};
  width: 1.2rem;
  height: 3px;
  display: inline-block;
  transition: all 0.3s;
  &::before,
  &::after {
    content: "";
    background-color: ${(props) =>
      props["background="] ? props.background : "white"};
    width: 1.5rem;
    height: 3px;
    display: inline-block;
    position: absolute;
    left: 0;
    transition: all 0.6s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
  ${MenuLabel}:hover &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.5rem")};
  }
  ${MenuLabel}:hover &::after {
    top: ${(props) => (props.clicked ? "0" : "0.5rem")};
  }
`;
