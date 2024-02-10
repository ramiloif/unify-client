import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Button,
  styled,
  IconButton,
} from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: "auto",
  padding: theme.spacing(3),
  textAlign: "center",
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.primary.contrastText,
  boxShadow: theme.shadows[8],
  display: "flex",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontFamily: "'Poppins', sans-serif", // Use a suitable font, you can replace 'Poppins' with your desired font
  letterSpacing: "0.5px", // Add slight letter spacing for improved readability
  lineHeight: 1.2, // Adjust line height for better text flow
  // color: theme.palette.primary.contrastText,
  // "&.subtitle1": {
  //   color: theme.palette.text.primary, // Set color for subtitle1
  // },

  // "&.subtitle2": {
  //   color: theme.palette.text.primary, // Set color for subtitle2
  // },
}));

const StyledList = styled(List)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  padding: 0,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  width: "200px",
  margin: theme.spacing(2),
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
  height: "150px",
  objectFit: "cover",
  borderRadius: "5%",
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: theme.spacing(2),
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

const DeleteIconButton = styled(StyledIconButton)(({ theme }) => ({
  right: theme.spacing(1),
}));

const AddGroupIconButton = styled(StyledIconButton)(({ theme }) => ({
  left: theme.spacing(1),
}));

export {
  StyledCard,
  StyledTypography,
  StyledList,
  StyledListItem,
  StyledImage,
  StyledCardContent,
  StyledButton,
  DeleteIconButton,
  AddGroupIconButton,
};
