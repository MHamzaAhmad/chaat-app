import { refreshTokensRoute } from "../config/routes";
import apiClient from "../utils/apiClient";

export const refreshTokens = async () => {
  const res = await apiClient.get(refreshTokensRoute);
  if (res.status === 401) {
    throw new Error("Refresh token is expired");
  }
  setAccessAndRefreshToken(res.body);
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const setAccessAndRefreshToken = ({ accessToken, refreshToken }) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};
