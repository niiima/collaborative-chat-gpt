import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req, res) {
  //   console.log(req);
  //const { name, artist } = { name: "lady in red", artist: "chris de burgh" }; //
  const json_playlist = req.body;
  // console.log(json_playlist);
  let accessToken = null;
  // console.log(name, artist);
  try {
    // First, get an access token from the Spotify API
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    });

    const { access_token } = await response.json();
    accessToken = access_token;
  } catch (error) {
    console.error(error);
    return new NextResponse(
      { message: "Can't get Spotify Access Token" },
      {
        status: 400,
      }
    );
  }
  console.log(accessToken);

  // Use the access token to search for the track on the Spotify API
  const playlistPromiseArray = [];
  // Search for each track;
  try {
    for await (const song of json_playlist) {
      const searchResult = await fetch(
        `https://api.spotify.com/v1/search?q=track:${song.title} artist:${song.artist}&type=track&limit=1`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (searchResult.status === 200)
        playlistPromiseArray.push(await searchResult.json());
    }
    if (playlistPromiseArray.length === 0)
      return new NextResponse(
        { message: "Authentication to spotify failed" },
        {
          status: 400,
        }
      );

    const playlist = await Promise.all(playlistPromiseArray);
    const mutatedPlaylist = [];
    for (const song of playlist) {
      const { tracks } = song;
      // console.log(tracks);
      if (tracks.items.length) {
        // console.log(tracks.items[0]);
        const {
          id,
          name: trackName,
          artists,
          preview_url,
          uri,
        } = tracks.items[0];
        mutatedPlaylist.push({ trackName, artists, preview_url, uri, id });
      }
    }
    if (mutatedPlaylist.length > 0) {
      return new Response(JSON.parse(JSON.stringify(mutatedPlaylist)), {
        status: 200,
      });
    } else
      return new NextResponse(
        { message: "Couldn't find any of the tracks!" },
        { status: 500 }
      );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
