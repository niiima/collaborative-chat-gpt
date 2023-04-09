import React from "react";
import { Icon, MenuLabel } from "./styles";

function HamburgerIcon(props) {
  const { handleClick, open, color, background } = props;
  return (
    <MenuLabel
      onClick={handleClick}
      background={background}
      color={color}
      clicked={open}>
      <Icon color={color} clicked={open}>
        &nbsp;
      </Icon>
    </MenuLabel>
  );
}

export default HamburgerIcon;
