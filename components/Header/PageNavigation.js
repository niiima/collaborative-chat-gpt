import { MdAirlineStops, MdMultipleStop } from "react-icons/md";
// import { FcPicture } from "react-icons/fc";
import { Flex } from "../Atoms/Flex";
import { FlexItem } from "../Atoms/FlexItem";
import { BsArrowLeftRight } from "react-icons/bs";
import { VscGithubAction } from "react-icons/vsc";
import styled from "styled-components";
import Link from "next/link";
const ICON_SIZE = 20;
const NavigationWrapper = styled(Flex)`
  //width: 600;
  height: 10px;
  margin-top: 5px;
`;

const LinkItem = styled(FlexItem)`
  max-width: 50px;
  margin: 0;
`;
const PageNavigation = () => {
  return (
    <NavigationWrapper width={600}>
      <LinkItem>
        <Link href='/'>
          <BsArrowLeftRight color='white' size={ICON_SIZE} />
        </Link>
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
      </LinkItem>
      <LinkItem>
        <Link href='/acts'>
          <VscGithubAction color='white' size={ICON_SIZE} />
        </Link>
      </LinkItem>
      <LinkItem>
        <Link href='/stream'>
          <MdMultipleStop color='white' size={ICON_SIZE} />
        </Link>
      </LinkItem>
    </NavigationWrapper>
  );
};

export default PageNavigation;
