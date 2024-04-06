import { useParams } from "react-router-dom";
import {
  StyledCardContent,
  StyledContainer,
  StyledList,
} from "./styles/components-styles";

import { useContext, useEffect, useState } from "react";
import { PlaylistDto } from "../dto/playlist-dto";
import SearchSong from "./search-song";
//import FavoriteIcon from "@mui/icons-material/Favorite";

import { SpotifyTrackInfo } from "../constants/spotify";
import SongItem from "./song-item";
import { addSong, fetchPlaylist, removeSong, unvote, vote } from "../api/server";
import { Card, Typography, styled } from "@mui/material";
import { SongDto } from "../dto/song-dto";
import { UserContext } from "../user-context";

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto, sans-serif', // You can replace this with a Google Font link
  fontWeight: 1000,
  color: theme.palette.primary.contrastText,
  marginBottom: theme.spacing(1)
}));


function Playlist() {
  const [playlist, setplaylist] = useState<PlaylistDto>();
  const [search, setSearch] = useState<boolean>(false);

  const context = useContext(UserContext)
  const { playlistId } = useParams();

  const fetchSongs = async () => {
    try {
      const playlist = await fetchPlaylist(playlistId);
      setplaylist(playlist);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const onSearch = async (isSearch: boolean) => {
    setSearch(isSearch);
  };
  const addTrack = async (track: SpotifyTrackInfo) => {
    if (!track) {
      return false;
    }
    if (playlist?.songs.find((song) => song.spotifySongId == track.id)) {
      return false;
    }
    await addSong(track, playlistId);
    fetchSongs();
    return true;
  };

  const onDelete = async (playlistId: string, spotifySongId: string) => {
    try {
      await removeSong(playlistId, spotifySongId);
      await fetchSongs();
    } catch (e) {
      console.error("Error removing playlist:", e);
    }
  };

  const onVote = async(songDto: SongDto) => {
    if(songDto.voters.includes(context.user.userId)) {
      await unvote(songDto, context.user.userId)
    } else {
      await vote(songDto, context.user.userId);
    }
    await fetchSongs();
  }

  return (
    <StyledContainer>
      <StyledCardContent>
      <Card raised sx={{ padding: 1, margin: 1 ,backgroundColor: 'transparent', boxShadow: 'none'}}>
      <Title variant="h4" gutterBottom>
                {playlist?.name}
            </Title>
            <Typography variant="subtitle1" color="textSecondary">
            {playlist?.songs.length} songs ·  members 1
            </Typography>
          </Card>
        <SearchSong onSearch={onSearch} addTrack={addTrack} />
        <StyledList style={{ filter: search ? "blur(5px)" : "none" }}>
          {playlist?.songs.map((song) => (
            <SongItem
              key={song.spotifySongId}
              song={song}
              playlistId={playlistId === undefined ? "" : playlistId}
              onDelete={onDelete}
              onVote={onVote}
              disabled={search}
              userVoted={song.voters.includes(context.user.userId)}
            ></SongItem>
          ))}
        </StyledList>
      </StyledCardContent>
    </StyledContainer>
  );
}

export default Playlist;
