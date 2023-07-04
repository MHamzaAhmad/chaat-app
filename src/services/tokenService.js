import { refreshTokensRoute } from "../config/routes";

export const refreshTokens = async (api) => {
  const res = await api.get(refreshTokensRoute);
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

export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
