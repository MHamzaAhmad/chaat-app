import { createContext, useContext } from "react";
import { useIO } from "../contexts/socketContext";
import { useUser } from "../redux/hooks";
import { useApi } from "../contexts/apiContext";
import { getMessagesRoute } from "../config/routes";
import _ from "lodash";

const MessageServiceContext = createContext({
  messageService: {},
});

export const useMessageService = () => useContext(MessageServiceContext);

const MessageService = ({ children }) => {
  const { io } = useIO();
  const { api } = useApi();
  const { subject } = useUser();
  const messageService = {
    sendMessage: (msg, to) => {
      io.emit("message", { to, msg });
    },
    getMessages: async () => {
      try {
        if (_.isEmpty(subject)) return;
        const messages = await api.get(getMessagesRoute, {
          params: { receiverId: subject._id },
        });
        return messages.data;
      } catch (error) {
        console.log("Error getting messages for this user");
        return [];
      }
    },
  };
  return (
    <MessageServiceContext.Provider value={{ messageService }}>
      {children}
    </MessageServiceContext.Provider>
  );
};

export default MessageService;
