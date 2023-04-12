import { MdAirlineStops } from "react-icons/md";
// import { FcPicture } from "react-icons/fc";
import { Flex } from "../Atoms/Flex";
import { FlexItem } from "../Atoms/FlexItem";
import { BsArrowLeftRight } from "react-icons/bs";
import { VscGithubAction } from "react-icons/vsc";
import { GiAbstract037 } from "react-icons/gi";
import styled from "styled-components";
import Link from "next/link";
const ICON_SIZE = 20;
const NavigationWrapper = styled(Flex)`
  width: 100%;
  height: 8svh;
  /* margin-top: 5px; */
`;

const LinkItem = styled(FlexItem)`
  max-width: 100px;
  margin: 0;
  margin-top: -5px;
  & span {
    position: absolute;
    margin-top: 30px;
    color: white;
  }
`;
const PageNavigation = () => {
  return (
    <NavigationWrapper>
      <LinkItem>
        <Link href='/'>
          <BsArrowLeftRight color='white' size={ICON_SIZE} />
        </Link>
        <span>Conversation</span>
      </LinkItem>
      {/* <LinkItem>
        <Link href='/art'>
          <FcPicture color='white' size={ICON_SIZE} />
        </Link>
      </LinkItem> */}
      <LinkItem>
        <Link href='/single'>
          <MdAirlineStops color='white' size={ICON_SIZE} />
        </Link>
        <span>Single Messaging</span>
      </LinkItem>
      <LinkItem>
        <Link href='/acts'>
          <VscGithubAction color='white' size={ICON_SIZE} />
        </Link>{" "}
        <span>Instant Act</span>
      </LinkItem>
      <LinkItem>
        <Link href='/stream'>
          <GiAbstract037 color='white' size={ICON_SIZE} />
        </Link>
        <span>GPT 3</span>
      </LinkItem>
    </NavigationWrapper>
  );
};

export default PageNavigation;
