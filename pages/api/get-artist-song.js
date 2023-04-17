export default async function handler(req, res) {
  console.log(req);
  //const { name, artist } = { name: "lady in red", artist: "chris de burgh" }; //
  const { name, artist, access_token } = req.body;
  console.log(name, artist);
  try {
    // First, get an access token from the Spotify API
    // const response = await fetch("https://accounts.spotify.com/api/token", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Authorization: `Basic ${Buffer.from(
    //       `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    //     ).toString("base64")}`,
    //   },
    //   body: "grant_type=client_credentials",
    // });

    //const { access_token } = await response.json();

    // Use the access token to search for the track on the Spotify API
    const searchResponse = await fetch(
      `https://api.spotify.com/v1/search?q=track:${name} artist:${artist}&type=track&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // console.log(searchResponse);

    const { tracks } = await searchResponse.json();
    //console.log(tracks);
    if (tracks.items.length === 0) {
      return res.status(404).json({ message: "Track not found" });
    }

    const { name: trackName, artists, preview_url } = tracks.items[0];

    return res.status(200).json({ trackName, artists, preview_url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
