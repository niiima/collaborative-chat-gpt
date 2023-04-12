import { modes, colorArray } from "../../model/Content";
import { Typography } from "../Atoms/Typography";
import styled from "styled-components";
const TypoItems = styled(Typography)`
  margin-bottom: 5px;
`;
const UlWrapper = styled.ul`
  border: 2px solid lightskyblue;
  background-color: white;
  border-radius: 10px;
  padding: 0;
  padding-left: 10px;
  margin: 0;
`;
const ModeSelector = ({ handleChange }) => {
  return (
    <UlWrapper>
      {modes.map((mode, i) => (
        <li key={mode.name} style={{ listStyle: "none" }}>
          <TypoItems
            color={colorArray[i]}
            onClick={() => handleChange(mode.prompt)}>
            {mode.icon ? mode.icon : "⌫"} {mode.name}
          </TypoItems>
        </li>
      ))}
    </UlWrapper>
  );
};

export default ModeSelector;
