import { FC, HTMLAttributes, useContext, useEffect, useState } from "react";
import { UserContext } from "../user-context";
import {
  StyledTypography,
  Styled1LinesOverflowTypography,
  Styled2LinesOverflowTypography,
} from "./styles/components-styles";
import { SpotifyTrackInfo } from "../constants/spotify";
import {
  Autocomplete,
  Button,
  ClickAwayListener,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { searchSpotifyTrack } from "../api/spotify";

interface SearchSongProps {
  addTrack: (track: SpotifyTrackInfo) => Promise<boolean>;
  onSearch: (serach: boolean) => void;
}

const SearchSong: FC<SearchSongProps> = ({ addTrack, onSearch }) => {
  const context = useContext(UserContext);
  const accessToken = context.user.spotifyAccessToken;

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SpotifyTrackInfo[]>([]);
  const [songSelected, setSongSelected] = useState<SpotifyTrackInfo | null>(
    null,
  );

  const handleSearch = async (query: string) => {
    if (!query?.trim()) {
      setSuggestions([]);
      onSearch(false);
      return;
    }
    onSearch(true);

    if (!accessToken) {
      return;
    }
    const results = await searchSpotifyTrack(query, accessToken);

    try {
      setSuggestions(results);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  useEffect(() => {
    const addSongToPlaylist = async () => {
      if (songSelected) {
        if (await addTrack(songSelected)) {
          // Filter out the selected track from suggestions
          setSuggestions((prevSuggestions) =>
            prevSuggestions.filter(
              (suggestion) => suggestion.id !== songSelected.id,
            ),
          );
        }
      }
    };

    addSongToPlaylist();
  }, [songSelected]);

  const handleClickAway = () => {
    onSearch(false);
    setSuggestions([]);
    setSongSelected(null); // Reset songSelected state
  };
  const renderOption = (
    _props: HTMLAttributes<HTMLLIElement>,
    track: SpotifyTrackInfo,
  ) => (
    <Paper
      elevation={3}
      style={{
        height: "110px",
        padding: "20px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ flex: 1 }}>
        <Tooltip title={track.name}>
          <Styled2LinesOverflowTypography variant="subtitle1">
            {track.name}
          </Styled2LinesOverflowTypography>
        </Tooltip>

        <Tooltip title={track.artists[0].name}>
          <Styled1LinesOverflowTypography variant="subtitle2">
            {track.artists[0].name}
          </Styled1LinesOverflowTypography>
        </Tooltip>

        <Tooltip title={track.album.name}>
          <Styled1LinesOverflowTypography variant="subtitle2">
            {track.album.name}
          </Styled1LinesOverflowTypography>
        </Tooltip>
      </div>
      <div>
        <Button
          onClick={() => {
            setSongSelected(track);
          }}
          variant="contained"
          color="primary"
          style={{ marginRight: "10px", marginLeft: "10px" }} // Set width and add margin-right
        >
          <AddIcon />
        </Button>
      </div>
    </Paper>
  );

  return (
    <div>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <Autocomplete
            id="search-autocomplete"
            options={suggestions}
            noOptionsText=""
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search for a song to add"
                onChange={(e) => setQuery(e.target.value)}
                sx={{
                  "& .MuiAutocomplete-inputRoot": {
                    backgroundColor: "white",
                    color: "black",
                  },
                  //width: "100%",
                  maxWidth: 400,
                }}
              />
            )}
            renderOption={renderOption}
          />
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default SearchSong;
