import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Button,
  styled,
  IconButton,
  Container,
  IconButtonProps,
} from "@mui/material";

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(4),
  textAlign: "center",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.secondary.dark})`,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.spacing(5),
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  justifyContent: "space-between",
  padding: theme.spacing(2),
  alignContent: "center",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontFamily: "'Poppins', sans-serif", // Use a suitable font, you can replace 'Poppins' with your desired font
  letterSpacing: "0.5px", // Add slight letter spacing for improved readability
  lineHeight: 1.2, // Adjust line height for better text flow
}));

const Styled2LinesOverflowTypography = styled(StyledTypography)(({}) => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2, // Limit to 2 lines
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const Styled1LinesOverflowTypography = styled(StyledTypography)(({}) => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1, // Limit to 1 lines
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const StyledList = styled(List)(({}) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  padding: 0,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  minHeight: "10vh",

  width: "200px",
  height: "280px",
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  textAlign: "center",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
  display: "flex",
  flexDirection: "column",
  position: "relative",
  borderRadius: "5%",
  color: theme.palette.text.primary,
}));

const StyledImage = styled("img")(({ theme }) => ({
  width: "100%",
  maxHeight: "500px",
  maxWidth: "500px",
  objectFit: "cover",
  borderRadius: "5%",
  marginBottom: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(4),
  textTransform: "none",
  fontWeight: "bold",
  padding: theme.spacing(2, 4),
  marginTop: theme.spacing(4),
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.success.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
  "& i": {
    marginRight: theme.spacing(1),
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(1),
  backgroundColor: theme.palette.info.main,
  color: theme.palette.info.contrastText,
  borderRadius: "50%",
  "&:hover": {
    backgroundColor: theme.palette.info.dark,
  },
}));

const RightIconButton = styled(StyledIconButton)(({ theme }) => ({
  right: theme.spacing(1),
}));

const LeftIconButton = styled(StyledIconButton)(({ theme }) => ({
  left: theme.spacing(1),
}));

interface StyledIconButtonProps extends IconButtonProps {
  hasvote?: string;
}

const StyledVoteIconButton = styled(IconButton)<StyledIconButtonProps>(
  ({ theme, hasvote }) => ({
    position: "absolute",
    bottom: theme.spacing(1),
    color: hasvote == "true" ? "#FFD300" : "#fff",
    backgroundColor: theme.palette.primary.dark,
    transition: "background-color 0.3s, color 0.3s", // Add transition for smooth hover effect
    left: theme.spacing(1),

    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "& .MuiIconButton-label": {
      transition: "transform 0.3s", // Add transition for icon animation
    },

    "&:active": {
      transform: "scale(0.95)", // Add slight scale effect when button is pressed
    },
  }),
);

export default StyledVoteIconButton;

export {
  StyledContainer,
  StyledCard,
  StyledTypography,
  Styled1LinesOverflowTypography,
  Styled2LinesOverflowTypography,
  StyledList,
  StyledListItem,
  StyledImage,
  StyledCardContent,
  StyledButton,
  RightIconButton,
  LeftIconButton,
  StyledVoteIconButton,
};
