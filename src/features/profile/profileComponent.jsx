import { Avatar, Box, Typography } from "@mui/material";
import { useUser } from "../../redux/hooks";
import { secondaryTextColor } from "../../utils/colors";

const ProfileComponent = () => {
  const { user } = useUser();

  return (
    <Box
      sx={{
        color: secondaryTextColor,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Avatar
        sx={{ width: 80, height: 80 }}
        src={`https://robohash.org/${user?._id ?? "placeholder"}`}
      />
      <Typography>{user.name}</Typography>
    </Box>
  );
};

export default ProfileComponent;
