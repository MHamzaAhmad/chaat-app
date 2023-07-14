import { createContext, useContext, useState } from "react";
import io from "socket.io-client";
import {
  hasTokens,
  refreshTokens,
  removeTokens,
} from "../services/tokenService";
import { useUser } from "../redux/hooks";
import { useApi } from "./apiContext";
import { useUserService } from "../services/userService";

const SocketContext = createContext({
  io: {},
});

export const useIO = () => useContext(SocketContext);

const SocketManager = ({ children }) => {
  const { setIsAuthenticated } = useUser();
  const { userService } = useUserService();
  const { api } = useApi();
  const socket = io(process.env.REACT_APP_SOCKET_URL, {
    extraHeaders: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  socket.on("connect_error", async (error) => {
    if (error.message === "jwt expired") {
      try {
        if (!hasTokens()) return;
        await refreshTokens(api);
        setIsAuthenticated(true);
      } catch (e) {
        await userService.logout();
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
