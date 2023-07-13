import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { accentColor, secondaryColor } from "../../../utils/colors";
import { Send } from "@mui/icons-material";
import { useUser } from "../../../redux/hooks";
import { useMessageService } from "../../../services/messageService";
import { useState } from "react";
import ChatHeader from "./ChatHeader";

const ChatBox = (props) => {
  const [msg, setMsg] = useState({});
  const { subject } = useUser();
  const { messageService } = useMessageService();

  const sendMessage = () => {
    messageService.sendMessage(msg, subject._id);
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <ChatHeader />
      <Box
        sx={{
          background: secondaryColor,
          width: "100%",
          padding: "0.6rem 1rem",
        }}
      >
        <TextField
          placeholder="Shoot the msg from here..."
          onChange={(e) => {
            console.log(e);
            setMsg(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={(e) => {
                    sendMessage();
                  }}
                >
                  <Send
                    sx={{
                      color: accentColor,
                    }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default ChatBox;
