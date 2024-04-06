import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { FC, useContext, useEffect, useState } from "react";
import { SongDto } from "../dto/song-dto";
import StyledVoteIconButton, {
  RightIconButton,
  StyledImage,
  StyledListItem,
  Styled2LinesOverflowTypography,
} from "./styles/components-styles";
import DeleteDialog from "./delet-dialog";
import { Tooltip, Typography } from "@mui/material";


interface SongItemProps {
  song: SongDto;
  playlistId: string;
  onDelete: (playlistId: string, spotifyId: string) => void;
  onVote: (SongDto: SongDto) => void;
  disabled: boolean;
  userVoted: boolean;
}
const SongItem: FC<SongItemProps> = ({
  song,
  playlistId,
  onDelete,
  disabled,
  onVote,
  userVoted,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleVoteClick = async () => {
    onVote(song);
  };

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(playlistId, song.spotifySongId);
    setDialogOpen(false);
  };

  return (
    <StyledListItem key={song.spotifySongId}>
      <StyledImage src={song.albumCoverUrl} alt={song.name} />
      <Tooltip title={song.name} disableHoverListener={disabled}>
        <Styled2LinesOverflowTypography variant="subtitle1">
          {song.name}
        </Styled2LinesOverflowTypography>
      </Tooltip>
      <StyledVoteIconButton
        hasvote={userVoted.toString()}
        onClick={handleVoteClick}
        disabled={disabled}
      >
        <ThumbUpIcon/>
        <Typography component="span" sx={{ marginLeft: 1 }}>
                {song?.voters.length || 0}
            </Typography>
      </StyledVoteIconButton>
      <RightIconButton onClick={() => handleDeleteClick()} disabled={disabled}>
        <DeleteIcon />
      </RightIconButton>
      <DeleteDialog
        open={isDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemToDeleteId={playlistId}
      />
    </StyledListItem>
  );
};

export default SongItem;
