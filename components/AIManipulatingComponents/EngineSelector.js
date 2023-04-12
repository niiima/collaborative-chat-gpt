import styled from "styled-components";
import { FlexItem } from "../Atoms/FlexItem";
import { Typography } from "../Atoms/Typography";
import { Flex } from "../Atoms/Flex";
const ModelSelectBox = styled(Flex)`
  padding: 0 !important;
  margin: 0;
  width: 200px;
`;

const SelectBoxWrapper = styled(FlexItem)`
  margin-top: 1px;
`;

const EngineSelector = ({ engines, changeEngineHandler }) => {
  return (
    <ModelSelectBox>
      <FlexItem>
        <Typography fontSize={20} lineHeight={1}>
          Models:{" "}
        </Typography>
      </FlexItem>
      <SelectBoxWrapper>
        <select onChange={(e) => changeEngineHandler(e)}>
          {engines.map((eng) => (
            <option key={eng.id} value={eng.key}>
              {eng.name}
            </option>
          ))}
        </select>
      </SelectBoxWrapper>
    </ModelSelectBox>
  );
};
export default EngineSelector;
