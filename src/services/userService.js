import { createContext, useContext } from "react";
import {
  getCurrentUserRoute,
  getUsersRoute,
  signInRoute,
  signUpRoute,
  userChatsRoute,
} from "../config/routes";
import { useApi } from "../contexts/apiContext";
import { removeTokens, setAccessAndRefreshToken } from "./tokenService";
import { useUser } from "../redux/hooks";

const UserServiceContext = createContext({
  userService: {},
});

export const useUserService = () => useContext(UserServiceContext);

const UserService = ({ children }) => {
  const { api } = useApi();
  const { login, logout } = useUser();
  const userService = {
    signUp: async (values) => {
      try {
        const res = await api.post(signUpRoute, values);
        setAccessAndRefreshToken(res.data);
        return true;
      } catch (error) {
        console.log(`Error signing up: ${error}`);
        return false;
      }
    },
    signIn: async (values) => {
      try {
        const res = await api.post(signInRoute, values);
        setAccessAndRefreshToken(res.data);
        return true;
      } catch (error) {
        console.log(`Error signing in: ${error}`);
        return false;
      }
    },
    logout: async () => {
      removeTokens();
      await logout();
    },
    login: async () => {
      await login();
    },
    getUsers: async () => {
      try {
        const res = await api.get(getUsersRoute);
        return res.data;
      } catch (error) {
        console.log("Error while getting users");
      }
    },
    getCurrentUser: async () => {
      try {
        const res = await api.get(getCurrentUserRoute);
        return res.data;
      } catch (error) {
        console.log("Error getting current user");
      }
    },
    getChats: async () => {
      try {
        const res = await api.get(userChatsRoute);
        return res.data;
      } catch (error) {
        console.log("Error getting the chats of the user");
      }
    },
  };
  return (
    <UserServiceContext.Provider value={{ userService }}>
      {children}
    </UserServiceContext.Provider>
  );
};

export default UserService;
