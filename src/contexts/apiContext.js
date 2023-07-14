import axios from "axios";
import {
  getAccessToken,
  hasTokens,
  refreshTokens,
  removeTokens,
} from "../services/tokenService";
import { createContext, useContext } from "react";
import { useUser } from "../redux/hooks";
import { useUserService } from "../services/userService";

const ApiContext = createContext({
  api: {},
});

export const useApi = () => useContext(ApiContext);

const ApiManager = ({ children }) => {
  const { setIsAuthenticated } = useUser();
  const { userService } = useUserService();
  const api = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

  api.interceptors.request.use(
    (config) => {
      const accessToken = getAccessToken();
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  api.interceptors.request.use(
    (res) => {
      return res;
    },
    async (error) => {
      const originalReq = error.config;
      if (error.response.status === 401) {
        try {
          if (!hasTokens()) throw new Error();
          await refreshTokens(api);
          setIsAuthenticated(true);
          await api(originalReq);
        } catch (error) {
          await userService.logout();
        }
      }
    }
  );

  return (
    <ApiContext.Provider value={{ api: api }}>{children}</ApiContext.Provider>
  );
};

export default ApiManager;
