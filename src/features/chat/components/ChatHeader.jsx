import { Avatar, Box, Grid, Typography } from "@mui/material";
import { mainColor, secondaryColor } from "../../../utils/colors";
import { useUser } from "../../../redux/hooks";

const ChatHeader = (props) => {
  const { subject } = useUser();
  return (
    <Box
      sx={{
        width: "100%",
        height: "4rem",
        backgroundColor: secondaryColor,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={2}>
          <Avatar
            src={`https://robohash.org/${subject?._id ?? "placeholder"}`}
            sx={{ width: 56, height: 56 }}
          />
        </Grid>
        <Grid item xs={10}>
          <Typography color={mainColor}>{subject.name}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatHeader;
