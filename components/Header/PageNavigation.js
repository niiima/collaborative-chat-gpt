import { MdAirlineStops, MdMultipleStop } from "react-icons/md";
// import { FcPicture } from "react-icons/fc";
import { useContext } from "react";
import { Flex } from "../Atoms/Flex";
import { FlexItem } from "../Atoms/FlexItem";
// import { BsArrowLeftRight } from "react-icons/bs";
// import { VscGithubAction } from "react-icons/vsc";

import { GiAbstract037 } from "react-icons/gi";
import styled from "styled-components";
import Link from "next/link";
import AIContext from "../../context/AIContext";
const ICON_SIZE = 20;
const NavigationWrapper = styled(Flex)`
  width: 90%;
  height: 8svh;
  margin: 0;
  padding: 0;
`;

const LinkItem = styled(FlexItem)`
  max-width: 110px;
  font-size: 11px;
  font-weight: 500;
  @media only screen and (max-width: 780px) {
    max-width: 100px;
    font-size: 9px;
    font-weight: 400;
  }

  @media only screen and (max-width: 480px) {
    max-width: 90px;
    font-size: 8px;
    font-weight: 300;
  }
  margin: 0;
  margin-top: -2svh;
  & * {
    color: white;
  }
  &.active {
    & * {
      text-decoration: underline;
      color: #ef3c39;
    }
  }
  & span {
    position: absolute;
    margin-top: 5svh;
    color: white;
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
    text: "Single Messaging",
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
    text: "GPT 3",
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
          className={`${activeRoute === route.id ? "active" : ""}`}
          key={route.url}>
          <Link href={route.url} onClick={() => setActiveRoute(route.id)}>
            {route.icon}
          </Link>
          <span>{route.text}</span>
        </LinkItem>
      ))}{" "}
    </NavigationWrapper>
  );
};

export default PageNavigation;
