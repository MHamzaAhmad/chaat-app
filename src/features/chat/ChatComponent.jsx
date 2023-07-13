import { Box, Grid } from "@mui/material";
import Chats from "./components/chats";
import ChatBox from "./components/chatBox";
import { secondaryTextColor } from "../../utils/colors";
import { useUser } from "../../redux/hooks";
import { useEffect } from "react";

const ChatComponent = ({ data }) => {
  const { initializeUserState } = useUser();

  useEffect(() => {
    initializeUserState();
  }, []);
  const commonItemStyles = {
    display: "flex",
    alignItems: "flex-end",
  };
  return (
    <Box
      sx={{
        border: `1px solid rgba(0, 0, 0, 0.12);`,
        borderRadius: "6px",
        color: secondaryTextColor,
      }}
    >
      <Grid container direction="row" sx={{ height: "86vh" }}>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: `1px solid rgba(0, 0, 0, 0.12);`,
            ...commonItemStyles,
          }}
        >
          <Chats />
        </Grid>
        <Grid
          item
          xs={9}
          sx={{
            ...commonItemStyles,
          }}
        >
          <ChatBox />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatComponent;
