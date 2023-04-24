import styled from "styled-components";

import {
  background,
  border,
  bottom,
  boxShadow,
  color,
  compose,
  layout,
  left,
  overflowY,
  position,
  right,
  space,
  top,
  typography,
  minHeight,
  height,
} from "styled-system";

export const composedHelpers = compose(
  background,
  layout,
  border,
  space,
  color,
  typography,
  top,
  bottom,
  left,
  right,
  position,
  boxShadow,
  overflowY,
  minHeight,
  height
);

export const Box = styled.div`
  ${composedHelpers}
`;

Box.defaultProps = {};
//export default Box;
