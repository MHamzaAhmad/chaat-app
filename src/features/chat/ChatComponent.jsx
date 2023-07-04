import { Box, Grid } from "@mui/material";
import Chats from "./components/chats";
import { useIO } from "../../contexts/socketContext";

const ChatComponent = ({ data }) => {
  const { io } = useIO();
  console.log(io);
  io.emit("message", { msg: "this is test messgae" });
  return (
    <Box
      sx={{
        border: `1px solid rgba(0, 0, 0, 0.12);`,
      }}
    >
      <Grid container direction="row">
        <Grid item xs={3}>
          <Chats />
        </Grid>
        <Grid item xs={9}>
          <Chats />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatComponent;
