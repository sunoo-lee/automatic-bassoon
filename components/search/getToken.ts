import axios from "axios";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as string;

export const getSpotifyToken = async () => {
  const params = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token: token } = await response.data;
    // console.log(await response.data);
    // console.log(token);
    return token;
  } catch (error) {
    console.log(error);
    return;
  }
};
