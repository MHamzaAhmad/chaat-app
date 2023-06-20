import axios from "axios";
import { getAccessToken, refreshTokens } from "../services/tokenService";

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
        await refreshTokens();
        await api(originalReq);
      } catch (error) {
        window.location.href = "/signin";
      }
    }
  }
);

const apiClient = {
  get: (url, params = {}) => {
    return api.get(url);
  },
  post: (url, body = {}) => {
    return api.post(url, body);
  },
};

export default apiClient;
