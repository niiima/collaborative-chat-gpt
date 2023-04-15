import { useContext } from "react";
import styled from "styled-components";
// import SvgSettingButton from "../svgs/SvgSettingButton";
import PageNavigation from "./PageNavigation";
// import LogoDropSvg from "../svgs/LogoDropSvg";
import HamburgerIcon from "../HamburgerIcon/HamburgerIcon";
import UIContext from "../../context/UIContext.js";

export const HeaderBar = styled.header`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  /* padding: 0.5rem; */
  background: linear-gradient(135deg, #11e7df 0%, #39f 50%, #b490ca 100%);
  /* flex: 0 0 1; */
  /* flex: 0 0 1; */
  height: 8svh;
  width: 100%;
`;

const Header = ({ children }) => {
  const { asideExpanded, setAsideExpand } = useContext(UIContext);

  return (
    <HeaderBar>
      {children}
      {/* <img src={GPTLogo} style={{ backgroundColor: "transparent" }}></img> */}
      {/* <LogoDropSvg></LogoDropSvg> */}
      {/* <SvgSettingButton color='gold' backgroundColor='transparent' /> */}
      <PageNavigation></PageNavigation>
      {/* <HamburgerIcon handleClick={handleClick} open={open} /> */}
      {/* <ToggleButton onClick={handleClick}>Toggle Sidebar</ToggleButton> */}
      <HamburgerIcon
        color='white'
        background='white'
        open={asideExpanded}
        handleClick={setAsideExpand}
      />
    </HeaderBar>
  );
};

export default Header;
