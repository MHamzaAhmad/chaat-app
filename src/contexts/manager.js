import UserService from "../services/userService";
import ApiManager from "./apiContext";
import SocketManager from "./socketContext";
import MessageService from "../services/messageService";

const ContextManager = ({ children }) => {
  return (
    <ApiManager>
      <SocketManager>
        <UserService>
          <MessageService>{children}</MessageService>
        </UserService>
      </SocketManager>
    </ApiManager>
  );
};

export default ContextManager;
