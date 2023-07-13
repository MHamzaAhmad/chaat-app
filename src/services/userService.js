import { createContext, useContext } from "react";
import {
  getUsersRoute,
  signInRoute,
  signUpRoute,
  userChatsRoute,
} from "../config/routes";
import { useApi } from "../contexts/apiContext";
import { setAccessAndRefreshToken } from "./tokenService";

const UserServiceContext = createContext({
  userService: {},
});

export const useUserService = () => useContext(UserServiceContext);

const UserService = ({ children }) => {
  const { api } = useApi();
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
    getUsers: async () => {
      try {
        const res = await api.get(getUsersRoute);
        return res.data;
      } catch (error) {
        console.log("Error while getting users");
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
