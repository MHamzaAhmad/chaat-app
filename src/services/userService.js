import { signInRoute, signUpRoute } from "../config/routes";
import apiClient from "../utils/apiClient";

const UserService = {
  signUp: async (values) => {
    try {
      const res = await apiClient.post(signUpRoute, values);
      const { accessToken, refreshToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (error) {
      console.log(`Error signing up: ${error}`);
    }
  },
  signIn: async (values) => {
    try {
      const res = await apiClient.post(signInRoute, values);
      const { accessToken, refreshToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (error) {
      console.log(`Error signing in: ${error}`);
    }
  },
};

export default UserService;
