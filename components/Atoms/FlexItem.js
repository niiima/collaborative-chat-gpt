import styled from "styled-components";
import { Flex } from "./Flex";

export const FlexItem = styled(Flex)``;
FlexItem.defaultProps = {
  bg: "brand",
  minHeight: 50,
  width: 300,
  mb: 0,
  fontSize: 10,
  fontWeight: 2,
  color: "black",
  justifyContent: "center",
  alignItems: "center",
};
