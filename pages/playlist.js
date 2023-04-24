import { useState, useContext, useRef, useEffect } from "react";
import Head from "next/head";
import { engines } from "../model/model.js";
import AuthContext from "../context/AuthContext.js";
// import ChatContext from "../context/ChatContext.js";
import AIContext from "../context/AIContext.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import ChatSettingsControl from "../components/AIManipulatingComponents/AISettingsControl.js";
import Header from "../components/Header/Header.js";
import UIContext from "../context/UIContext.js";
import ColorfulButtonSet from "../components/Buttons/ColorfulButtons.js";
import GroupRadioButtons from "../components/Inputs/GroupRadio/GroupRadioButtons.js";
import { Box } from "../components/Atoms/Box.js";
import OrdinaryButton from "../components/Buttons/OrdinaryButton.js";
import ResponsiveTable from "../components/Lists/ResponsiveTable.js";
import { MdOutlineFileDownload } from "react-icons/md";
import PreLoader from "../components/Loadings/PreLoader.js";
import { FlexItem } from "../components/Atoms/FlexItem.js";
import { Flex } from "../components/Atoms/Flex.js";
import MusicBarLoading from "../components/Loadings//MusicBarLoading.js";
import InputLine from "../components/Inputs/InputLine.js";
export default function MyPage() {
  const {
    asideExpanded,
    setAsideExpand,
    isPageInLoadingState,
    setIsPageInLoadingState,
  } = useContext(UIContext);
  // const { chatHistory, addToHistory, isLoading, setIsLoading } =
  //   useContext(ChatContext);

  const { AIstate, setAIState } = useContext(AIContext);
  // const { spotifyAccessToken, setSpotifyAccessToken } = useContext(AuthContext);

  const [activeEngine, setActiveEngine] = useState(engines[0]);
  const [playlist, setPlaylist] = useState(null);
  const [err, setErr] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState(
    "Make a Playlist of "
  );
  const [playlistObject, setPlaylistObject] = useState(null);
  async function getPlaylistTracks(jsonPlaylist) {
    // console.log(jsonPlaylist);
    // console.log(options);
    const response = await fetch("/api/playlist/get-playlist-tracks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonPlaylist),
    });
    if (response.status === 404) {
      return;
    }

    const res = await response.json();
    // console.log(res);
    return res; //setPlaylist(res);
  }

  const generateJsonPlaylist = async () => {
    setIsPageInLoadingState(true);
    try {
      let options = {
        engine: activeEngine.key,
        message: playlistDescription,
        ...AIstate,
      };
      // console.log(options);
      const response = await fetch("/api/playlist/generate-json-playlist", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });

      if (response.status !== 200) {
        setErr(res.error.message);
        setIsPageInLoadingState(false);
        return;
      }
      const res = await response.json();
      // console.log(res);
      setPlaylistObject(res);
      const playlistFetchResult = await getPlaylistTracks(res);
      setPlaylist(playlistFetchResult || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPageInLoadingState(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Playlist Generator</title>
      </Head>
      <Sidebar show={asideExpanded}>
        <ChatSettingsControl aiType='classic' />
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
      <Box
        background={"#111"}
        width={"100%"}
        padding={1}
        color='white'
        onClick={() => setAsideExpand(false)}>
        <Flex padding={0} margin={0} spacing={0}>
          <FlexItem width={"97%"}>
            <InputLine
              value={playlistDescription}
              handleChange={(e) => setPlaylistDescription(e)}
            />
          </FlexItem>
          <FlexItem width={"3%"}>
            <MdOutlineFileDownload
              style={{ position: "absolute", marginTop: 10 }}
              onClick={() => generateJsonPlaylist()}
              size={50}
              color={"lightskyblue"}
            />
          </FlexItem>
        </Flex>
      </Box>
      <Box
        className='scroll-customized'
        paddingTop={1}
        background={"#222"}
        width={"100%"}
        // paddingLeft={"1rem"}
        // paddingRight={"1rem"}
        overflowY='auto'
        height='85svh'>
        {/* {isPageInLoadingState && <PreLoader />} */}
        {isPageInLoadingState && <MusicBarLoading />}
        {err.length === 0 &&
          playlist &&
          playlist.map((track) => {
            //   console.log(track.artists);
            return (
              <div key={track.id}>
                {track && track["artists"] && track.artists[0] && (
                  <iframe
                    src={`https://open.spotify.com/embed?uri=${track.uri}`}
                    width='100%'
                    height='80'
                    frameBorder='0'
                    allowTransparency='true'></iframe>
                )}
              </div>
            );
          })}
      </Box>
    </div>
  );
}
