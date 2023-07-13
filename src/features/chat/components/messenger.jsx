import { Avatar, Box, Grid, Typography } from "@mui/material";
import { lightGrey, secondaryAccentColor } from "../../../utils/colors";
import { useUser } from "../../../redux/hooks";

const Messenger = ({ user, onClick }) => {
  const { setSubject } = useUser();
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: lightGrey,
        padding: "1.1rem 1.5rem",
        ":hover": {
          backgroundColor: secondaryAccentColor,
        },
      }}
      onClick={() => {
        setSubject(user);
        if (onClick) onClick();
      }}
    >
      <Grid container direction="row">
        <Grid item xs={2}>
          <Avatar src={`https://robohash.org/${user?._id ?? "placeholder"}`} />
        </Grid>
        <Grid
          item
          xs={10}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Typography>{user?.name ?? "I am no-one"}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Messenger;
