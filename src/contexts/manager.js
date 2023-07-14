import UserService from "../services/userService";
import ApiManager from "./apiContext";
import SocketManager from "./socketContext";
import MessageService from "../services/messageService";
import EventEmitter from "./eventEmitter";

const ContextManager = ({ children }) => {
  return (
    <EventEmitter>
      <ApiManager>
        <SocketManager>
          <UserService>
            <MessageService>{children}</MessageService>
          </UserService>
        </SocketManager>
      </ApiManager>
    </EventEmitter>
  );
};

export default ContextManager;
