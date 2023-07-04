import { signInRoute, signUpRoute } from "../config/routes";
import apiClient from "../contexts/apiContext";
import { setAccessAndRefreshToken } from "./tokenService";

const UserService = {
  signUp: async (values) => {
    try {
      const res = await apiClient.post(signUpRoute, values);
      setAccessAndRefreshToken(res.data);
      return true;
    } catch (error) {
      console.log(`Error signing up: ${error}`);
      return false;
    }
  },
  signIn: async (values) => {
    try {
      const res = await apiClient.post(signInRoute, values);
      setAccessAndRefreshToken(res.data);
      return true;
    } catch (error) {
      console.log(`Error signing in: ${error}`);
      return false;
    }
  },
};

export default UserService;
