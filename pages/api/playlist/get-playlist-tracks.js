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
    return res.status(500).json({ message: "Can't get Spotify Access Token" });
  }
  // console.log(accessToken);

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
      return res
        .status(500)
        .json({ message: "Authentication to spotify failed" });

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
      return res.status(200).json(JSON.parse(JSON.stringify(mutatedPlaylist)));
    } else
      return res
        .status(500)
        .json({ message: "Couldn't find any of the tracks!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
