import { MdAirlineStops, MdMultipleStop } from "react-icons/md";
import { useContext } from "react";
import { Flex } from "../Atoms/Flex";
import { FlexItem } from "../Atoms/FlexItem";
import { GiAbstract037 } from "react-icons/gi";
import styled from "styled-components";
import Link from "next/link";
import AIContext from "../../context/AIContext";
// import { FcPicture } from "react-icons/fc";
// import { BsArrowLeftRight } from "react-icons/bs";
// import { VscGithubAction } from "react-icons/vsc";

const ICON_SIZE = 26;
const NavigationWrapper = styled(Flex)`
  min-width: 80vw;

  justify-content: space-evenly;
  align-items: center;
  & > :first-of-type {
    padding-left: 5vw;
  }
`;

const LinkItem = styled(FlexItem)`
  @media only screen and (max-width: 780px) {
    font-size: 12px;
  }

  @media only screen and (max-width: 480px) {
    font-size: 10px;
  }
  @media only screen and (min-width: 1260px) {
    font-size: 25px;
  }
  & * {
    color: white;
  }
  &.active {
    & * {
      color: #123699;
    }
  }
`;

const routes = [
  {
    id: 0,
    url: "/",
    icon: <MdMultipleStop size={ICON_SIZE} />,
    text: "Conversation",
  },
  {
    id: 1,
    url: "/single",
    icon: <MdAirlineStops size={ICON_SIZE} />,
    text: "Messaging",
  },
  // {
  //   id: 2,
  //   url: "/acts",
  //   icon: <VscGithubAction size={ICON_SIZE} />,
  //   text: "Instant Act",
  // },
  {
    id: 3,
    url: "/stream",
    icon: <GiAbstract037 size={ICON_SIZE} />,
    text: "GPT-3",
  },
  // {
  //   id: 4,
  //   url: "/art",
  //   icon: <FcPicture color='white' size={ICON_SIZE} />,
  //   text: "Painting",
  // },
];
const PageNavigation = () => {
  const { activeRoute, setActiveRoute } = useContext(AIContext);

  return (
    <NavigationWrapper>
      {routes.map((route) => (
        <LinkItem
          lineHeight={0.5}
          fontWeight={"normal"}
          fontSize={2}
          className={`${activeRoute === route.id ? "active" : ""}`}
          key={route.url}>
          <Link href={route.url} onClick={() => setActiveRoute(route.id)}>
            <i style={{ position: "absolute", marginLeft: -30, marginTop: -8 }}>
              {route.icon}
            </i>
            <span
              style={{ display: "absolute", cursor: "pointer" }}
              onClick={() => setActiveRoute(route.id)}>
              {route.text}
            </span>
          </Link>
        </LinkItem>
      ))}
    </NavigationWrapper>
  );
};

export default PageNavigation;
