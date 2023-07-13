import { createContext, useContext } from "react";
import { useIO } from "../contexts/socketContext";

const MessageServiceContext = createContext({
  messageService: {},
});

export const useMessageService = () => useContext(MessageServiceContext);

const MessageService = ({ children }) => {
  const { io } = useIO();
  const messageService = {
    sendMessage: (msg, to) => {
      io.emit("message", { to, msg });
    },
  };
  return (
    <MessageServiceContext.Provider value={{ messageService }}>
      {children}
    </MessageServiceContext.Provider>
  );
};

export default MessageService;
