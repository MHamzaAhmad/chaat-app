import { createContext, useContext } from "react";
import io from "socket.io-client";
import { refreshTokens, removeTokens } from "../services/tokenService";
import { useUser } from "../redux/hooks";
import { useApi } from "./apiContext";

const SocketContext = createContext({
  io: {},
});

export const useIO = () => useContext(SocketContext);

const SocketManager = ({ children }) => {
  const { setIsAuthenticated } = useUser();
  const { api } = useApi();
  const socket = io(process.env.REACT_APP_SOCKET_URL, {
    extraHeaders: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  socket.on("connect_error", async (error) => {
    if (error.message === "jwt expired") {
      try {
        await refreshTokens(api);
        removeTokens();
      } catch (e) {
        setIsAuthenticated(false);
      }
    }
  });
  return (
    <SocketContext.Provider
      value={{
        io: socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketManager;
