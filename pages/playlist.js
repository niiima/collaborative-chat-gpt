import { useState, useContext, useRef, useEffect } from "react";
import Head from "next/head";
import { engines } from "../model/model.js";
import AuthContext from "../context/AuthContext.js";
import ChatContext from "../context/ChatContext.js";
import AIContext from "../context/AIContext.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import ChatSettingsControl from "../components/AIManipulatingComponents/AISettingsControl.js";
import Header from "../components/Header/Header.js";
import UIContext from "../context/UIContext.js";
// import { v4 as uuidv4 } from "uuid";
import ColorfulButtonSet from "../components/Buttons/ColorfulButtons.js";
import GroupRadioButtons from "../components/Inputs/GroupRadio/GroupRadioButtons.js";
//import EngineSelector from "../components/AIManipulatingComponents/EngineSelector.js";
// import RangeField from "../components/controls/RangeField.js";
import { Box } from "../components/Atoms/Box.js";
import OrdinaryButton from "../components/Buttons/OrdinaryButton.js";
import ResponsiveTable from "../components/Lists/ResponsiveTable.js";
import { MdOutlineFileDownload } from "react-icons/md";

export default function MyPage() {
  const { asideExpanded, setAsideExpand } = useContext(UIContext);

  const { chatHistory, addToHistory, isLoading, setIsLoading } =
    useContext(ChatContext);

  const { AIstate, setAIState } = useContext(AIContext);
  const { spotifyAccessToken, setSpotifyAccessToken } = useContext(AuthContext);

  const [activeEngine, setActiveEngine] = useState(engines[0]);
  const [playlist, setPlaylist] = useState(null);
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");

  async function getPlaylist() {
    const response = await fetch("/api/get-artist-song", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: spotifyAccessToken,
        name: songName,
        artist: artistName,
      }),
    });
    if (response.status === 404) {
      return;
    }
    // if (!response.ok) {
    //   throw new Error(response.statusText);
    // }
    const res = await response.json();
    console.log(res);
    setPlaylist(res);
  }

  const handleSearch = async () => {
    if (spotifyAccessToken.length === 0) {
      const response = await fetch("/api/get-spotify-access-token", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 404) {
        console.log(response);
        return;
      }
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const res = await response.json();
      console.log(res);
      setSpotifyAccessToken(res.data);
    }
    await getPlaylist();
  };

  // useEffect(() => getModels(), []);
  return (
    <div>
      <Head>
        <title>Playlist AI Assistant</title>
      </Head>
      <Sidebar show={asideExpanded}>
        <ChatSettingsControl aiType='classic' />
        {/* <EngineSelector
          engines={engines}
          changeEngineHandler={(e) => {
            let engineType = e.currentTarget.value;
            setActiveEngine(engines.find((eng) => eng.key === engineType));
          }}></EngineSelector> */}
        <GroupRadioButtons
          items={[
            ...engines.map((engine) => {
              return {
                text: engine.name,
                value: engine.key,
                isActive: engine.key === activeEngine.key,
              };
            }),
          ]}
          changeHandler={(e) =>
            setActiveEngine(engines.find((eng) => eng.key === e))
          }></GroupRadioButtons>
        <ColorfulButtonSet items={AIstate}></ColorfulButtonSet>
      </Sidebar>
      <Header></Header>
      <Box>
        <OrdinaryButton
          text={"get models"}
          handleOnClick={() => handleSearch()}
          icon={
            <MdOutlineFileDownload size={20} color={"lightskyblue"} />
          }></OrdinaryButton>
        <input
          value={songName}
          onChange={(e) => setSongName(e.currentTarget.value)}></input>
        <input
          value={artistName}
          onChange={(e) => setArtistName(e.currentTarget.value)}></input>
        {
          playlist && JSON.stringify(playlist)
          //   <ResponsiveTable data={playlist}></ResponsiveTable>
        }
      </Box>
    </div>
  );
}
