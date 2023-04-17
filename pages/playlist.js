import { useState, useContext, useRef, useEffect } from "react";
import Head from "next/head";
import { experimentalEngines as engines } from "../model/model.js";
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
  const [playlist, setPlaylist] = useState([]);

  const [playlistDescription, setPlaylistDescription] = useState("");
  const [playlistObject, setPlaylistObject] = useState([]);
  async function getSongInfo(song) {
    const options = {
      access_token: song.access_token, //spotifyAccessToken,
      name: song.name,
      artist: song.artist,
    };
    console.log(options);
    const response = await fetch("/api/get-artist-song", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });
    if (response.status === 404) {
      return;
    }

    const res = await response.json();
    console.log(res);
    return res; //setPlaylist(res);
  }

  const getAccessToken = async () => {
    const response = await fetch("/api/get-spotify-access-token", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 404) {
      //   console.log(response);
      return;
    }
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const res = await response.json();
    // console.log(res);
    setSpotifyAccessToken(res.data);
    return res.data;
  };

  const handleGeneratePlaylist = async () => {
    try {
      let options = {
        engine: activeEngine.key,
        message: playlistDescription,
        ...AIstate,
      };
      console.log(options);
      const response = await fetch("/api/generate-playlist", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });
      console.log(response);

      const res = await response.json();
      console.log(res);
      setPlaylistObject(res);
      console.log(playlistObject);
      const accessToken = await getAccessToken();
      //try {
      const songsInfo = res.map(async (song) => {
        //console.log(song);
        const songInfo = await getSongInfo({
          name: song.name,
          artist: song.artist,
          access_token: accessToken,
        });
        console.log(songInfo);
        return songInfo;
      });

      const resolvedList = (await Promise.all(songsInfo)).filter((el) => el);
      console.log(resolvedList);
      //if (songsInfo.length) {
      setPlaylist(resolvedList);
      //}
      //} catch (error) {

      //}
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect(() => {}, [playlist]);
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
        {/* <OrdinaryButton
          text={"get models"}
          handleOnClick={() => handleSearch()}
          icon={
            <MdOutlineFileDownload size={20} color={"lightskyblue"} />
          }></OrdinaryButton> */}
        {/* song: <input
          value={songName}
          onChange={(e) => setSongName(e.currentTarget.value)}></input>
        artist:
        <input
          value={artistName}
          onChange={(e) => setArtistName(e.currentTarget.value)}></input> */}
        What playlist should we make? <br />
        <input
          style={{ width: "85vw" }}
          value={playlistDescription}
          onChange={(e) =>
            setPlaylistDescription(e.currentTarget.value)
          }></input>
        <OrdinaryButton
          text={"get Playlist"}
          handleOnClick={() => handleGeneratePlaylist()}
          icon={
            <MdOutlineFileDownload size={20} color={"lightskyblue"} />
          }></OrdinaryButton>
        {/* {
          playlist && <pre>{JSON.stringify(playlist)}</pre>
          //   <ResponsiveTable data={playlist}></ResponsiveTable>
        }
        {playlistObject && JSON.stringify(playlistObject)} */}
        <div>
          {playlist &&
            playlist.map((track) => (
              <div key={track.id}>
                {track && track["artists"] && track.artists[0] && (
                  <iframe
                    src={`https://open.spotify.com/embed?uri=${track.artists[0].uri}`}
                    width='100%'
                    height='80'
                    frameborder='0'
                    allowTransparency='true'></iframe>
                )}
              </div>
            ))}
        </div>
        {/* {playlistObject && JSON.stringify(playlistObject)} */}
        {/* {playlistObject &&
          playlistObject.map((song) => <span>{song.name}</span><a href={}></a>)} */}
      </Box>
    </div>
  );
}
