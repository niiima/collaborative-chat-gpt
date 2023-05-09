// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.SPOTIFY_CLIENT_SECRET || ""}`,
    },
    method,
    body: JSON.stringify(body),
  });
  // console.log(res);
  return await res.json();
}

async function getTopTracks() {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (
    await fetchWebApi("v1/me/top/tracks?time_range=short_term&limit=5", "GET")
  ).items;
}

// const searchForTrack = async (str)=>{
//     return (await fetchWebApi(``,'GET'))
// }

export default async function handler(req, res) {
  try {
    const topTracks = await getTopTracks();
    // console.log(
    //   topTracks?.map(
    //     ({ name, artists }) =>
    //       `${name} by ${artists.map((artist) => artist.name).join(", ")}`
    //   )
    // );
    //const { data } = await topTracks;
    //console.log(data);
    // if (response.status === "ok") {
    // const flattedArray =

    res.status(200).json({ data: topTracks });
    //}
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}
