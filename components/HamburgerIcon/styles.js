import styled from "styled-components";

export const MenuLabel = styled.label`
  background-color: transparent;
  border-radius: 50%;
  height: 7rem;
  width: 7rem;
  cursor: pointer;
  z-index: 1000;
  text-align: center;
  transform: scale(0.5);
`;

export const Icon = styled.span`
  position: relative;
  background-color: ${(props) =>
    props.clicked
      ? "transparent"
      : `${props["color"] ? props.color : "white"}`};
  width: 3rem;
  height: 3px;
  display: inline-block;
  transition: all 0.3s;
  &::before,
  &::after {
    content: "";
    background-color: ${(props) => (props["color"] ? props.color : "white")};
    width: 3rem;
    height: 3px;
    display: inline-block;
    position: absolute;
    left: 0;
    transition: all 0.3s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
  ${MenuLabel}:hover &::before {
    top: ${(props) => (props.clicked ? "0" : "-1rem")};
  }
  ${MenuLabel}:hover &::after {
    top: ${(props) => (props.clicked ? "0" : "1rem")};
  }
`;
