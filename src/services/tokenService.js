import { refreshTokensRoute } from "../config/routes";
import _ from "lodash";

export const refreshTokens = async (api) => {
  const res = await api.get(refreshTokensRoute, {
    headers: {
      "x-refresh-token": getRefreshToken(),
    },
  });
  if (res.status === 401) {
    throw new Error("Refresh token is expired");
  }
  setAccessAndRefreshToken(res.data);
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const setAccessAndRefreshToken = ({ accessToken, refreshToken }) => {
  console.log({ accessToken, refreshToken });
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const hasTokens = () => {
  return !_.isNull(getAccessToken()) || !_.isNull(getRefreshToken());
};
