import styled from "styled-components";
import { Box } from "./Box";

import { compose, lineHeight, fontSize } from "styled-system";

const composedHelpers = compose(lineHeight, fontSize);

export const Typography = styled(Box)`
  ${composedHelpers}
`;

Typography.defaultProps = {
  // as: 'p',
  fontWeight: 2,
  // color: 'text500',
};
