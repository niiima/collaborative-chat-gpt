import { useState, createContext } from "react";
const AuthContext = createContext({});
export function AuthProvider({ children }) {
  const [spotifyAccessToken, setSpotifyAccessToken] = useState("");

  return (
    <AuthContext.Provider value={{ spotifyAccessToken, setSpotifyAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
