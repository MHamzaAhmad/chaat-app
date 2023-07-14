import { Box } from "@mui/material";
import { useMessageService } from "../../../services/messageService";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import ChatBubble from "./chatBubble";
import { useEventEmitter } from "../../../contexts/eventEmitter";
import { useUser } from "../../../redux/hooks";

const MessagesBox = () => {
  const [messages, setMessages] = useState([]);
  const { messageService } = useMessageService();
  const { eventEmitter } = useEventEmitter();
  const { subject } = useUser();
  const endRef = useRef(null);

  const newMsgSubx = useRef(0);

  useEffect(() => {
    const getMessages = async () => {
      const msgs = await messageService.getMessages();
      if (_.isEmpty(msgs)) return setMessages([]);
      setMessages(msgs);
    };
    getMessages();
  }, [subject]);

  useEffect(() => {
    endRef.current.scrollIntoView({ behaviour: "smooth" });
    eventEmitter.unSubscribe(newMsgSubx.current);
    newMsgSubx.current = eventEmitter.on("newMessage", (data) => {
      const newMessages = [...messages, data];
      setMessages(newMessages);
    });
  }, [messages]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        padding: "0 0 0.5rem 0",
      }}
    >
      {!_.isEmpty(messages) &&
        messages.map((msg) => <ChatBubble key={msg._id} msg={msg} />)}
      <div ref={endRef}></div>
    </Box>
  );
};

export default MessagesBox;
