import { Box } from "@mui/material";
import Messenger from "./messenger";
import StartNewChat from "./startNewChat";
import { useUser } from "../../../redux/hooks";
import _ from "lodash";

const Chats = () => {
  const { chats } = useUser();
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            overflowY: "scroll",
          }}
        >
          {!_.isEmpty(chats) &&
            chats.map((user) => <Messenger key={user._id} user={user} />)}
        </Box>
        <StartNewChat />
      </Box>
    </>
  );
};

export default Chats;
