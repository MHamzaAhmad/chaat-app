import { Avatar, Box, Typography } from "@mui/material";
import { useUser } from "../../../redux/hooks";
import { accentColor } from "../../../utils/colors";

const ChatBubble = ({ msg }) => {
  const { user } = useUser();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: user._id === msg.sender ? "row-reverse" : "row",
          alignItems: "center",
        }}
      >
        <Avatar src={`https://robohash.org/${msg?.sender ?? "placeholder"}`} />
        <Box
          sx={{
            backgroundColor: accentColor,
            margin: "0 1rem 0.2rem 0",
            padding: " 0.2rem 1rem",
            borderRadius:
              user._id === msg.sender
                ? "10px 10px 2px 10px"
                : "10px 10px 10px 2px",
          }}
        >
          <Typography>{msg.content}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default ChatBubble;
