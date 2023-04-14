import styled from "styled-components";
import { Box } from "./Box";

import { compose, lineHeight, fontSize, fontWeight } from "styled-system";

const composedHelpers = compose(lineHeight, fontSize, fontWeight);

export const Typography = styled(Box)`
  ${composedHelpers}
`;

Typography.defaultProps = {
  // as: 'p',
  fontWeight: 2,
  lineHeight: 1,
  fontSize: 1,
  // color: 'text500',
};
