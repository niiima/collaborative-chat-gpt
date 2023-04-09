import { useContext } from "react";
import styled from "styled-components";
import SvgSettingButton from "../svgs/SvgSettingButton";
import PageNavigation from "./PageNavigation";
import LogoDropSvg from "../svgs/LogoDropSvg";
import HamburgerIcon from "../HamburgerIcon/HamburgerIcon";
import UIContext from "../../context/UIContext.js";

const GPTLogo =
  "data:image/png;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAPAAA/+4AJkFkb2JlAGTAAAAAAQMAFQQDBgoNAAACbwAAAvYAAAPOAAAE0P/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8IAEQgAQABAAwERAAIRAQMRAf/EALIAAQACAwEAAAAAAAAAAAAAAAAFBgEDBAcBAQEBAQEAAAAAAAAAAAAAAAAEAwECEAABBAEEAwEAAAAAAAAAAAACIAEDBBEAMCEFMRIUExEAAQIEAwcFAQAAAAAAAAAAAQIDIBEhMQAiBDBRobHBEjJBYXHRYhQSAAMBAQAAAAAAAAAAAAAAACBAESEwEwEAAQMDBAEFAQEAAAAAAAABESAhMQBBUTBhcZGB8LHB0eGh8f/aAAwDAQACEQMRAAAB9UABEbYy2OuXQABCb4S+O2znQABULJLfHWAAKtXL356TWGwAFRsknJ95LPQADDlQsluEdYAAFXqmtEtIAAHN687ONvPQA//aAAgBAQABBQJA2Jo7TOzsq6f5W2D1dVqT6u1Vd7RyLrOvarGns7cs09KjFVjST4boY/Z19ePyXVz145hjaRmR/9oACAECAAEFAkY4WPhY8CoQ0ZZUA6Isrl2D5ZbOr//aAAgBAwABBQJGdgvK35dRHoRwo30I4XHsDw63ZX//2gAIAQICBj8Cb06he3//2gAIAQMCBj8Cbw49/9oACAEBAQY/AoHGnB3NjOk+oSeYBxMVBsY9I5vUWz8KxlsbpjZZRVLJmo8Tyj/n0Wd1VCsdMTVV5fkekQ0OmuaOHp94kmqz5L3xE4e1CqrJlPidg9pVUDmZk79gAu4qlQuD7HElq7v1Yw//2gAIAQEDAT8hosSIP1PYOdGnASGErMS3mMGfDfRK2eInk471zfs6xInpgea45O8EP374NIo/iZw/NWbLgb7suA0j3Av5/Q7VdhBdbWw+X3bdD1BUBNvMfboBgyykc7Y1DpHEPYFvUeKf/9oACAECAwE/IaEsjPQMo1NYkea9/DUrtUQT0qrWDoKLoFNMU//aAAgBAwMBPyGiQx0FA1FbhOK9jLXzqlWGgrHL0Lw6AOin/9oADAMBAAIRAxEAABCSQ+SSRqSSRSSSGSSS6SSPSSSTSSSTOST/2gAIAQEDAT8QodIYnLCMksSksIYdgskQFBIiZGtnhF8QyeEeipSZ2KZT3M2Yc5manhxGJywOFRKBLYMunTASOCi35fyKIEJXJpFbxut3wVIEsgoklgxfL45kMAyJezBwuPyqQwlIPBOgzT7dm++T0ClpQ+1yF3Cx3dCHObYjBrr/ADnQKAoug8xvLB2U/wD/2gAIAQIDAT8QoAWMO0/3SRZr8FT60yL1yzn6FYhjG371bjCr0N+vtqZOOKgl1GDjoQJtZ6DNv+6auEU//9oACAEDAwE/EKBlXM/GhmuQ9496INq48xWlc2kWXKr2r0LBnmpYNTS56Amd7nQFvoJlmn//2Q==";

export const HeaderBar = styled.header`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  /* padding: 0.5rem; */
  background: linear-gradient(135deg, #11e7df 0%, #39f 50%, #b490ca 100%);
  /* flex: 0 0 1; */
  /* flex: 0 0 1; */
  height: 60px;
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
