import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { SPOTIFY_LOGIN } from "./constants/routes";
import SpotifyLoginSuccess from "./components/spotify-login-success";
import Login from "./components/login";
import Home from "./components/home";
import Welcome from "./components/sign-up";
import { UserProvider } from "./user-context";
import Playlist from "./components/playlist";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html, body, #root {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
        }
      `,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path={SPOTIFY_LOGIN} element={<SpotifyLoginSuccess />} />
          <Route path="sign-up" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/playlist/:playlistId" element={<Playlist />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
