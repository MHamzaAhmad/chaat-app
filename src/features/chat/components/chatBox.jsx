import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { accentColor, secondaryColor } from "../../../utils/colors";
import { Send } from "@mui/icons-material";
import { useUser } from "../../../redux/hooks";
import { useMessageService } from "../../../services/messageService";
import { useState } from "react";
import ChatHeader from "./ChatHeader";
import MessagesBox from "./messagesBox";
import { useEventEmitter } from "../../../contexts/eventEmitter";
import { rndStr } from "../../../utils/helpers";

const ChatBox = (props) => {
  const [msg, setMsg] = useState("");
  const { subject, user } = useUser();
  const { messageService } = useMessageService();
  const { eventEmitter } = useEventEmitter();

  const sendMessage = () => {
    messageService.sendMessage(msg, subject._id);
    eventEmitter.emit("newMessage", {
      content: msg,
      _id: rndStr(),
      sender: user._id,
    });
    setMsg("");
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "86vh",
      }}
    >
      <ChatHeader />
      <MessagesBox />
      <Box
        sx={{
          background: secondaryColor,
          padding: "0.6rem 1rem",
        }}
      >
        <TextField
          placeholder="Shoot the msg from here..."
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
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
