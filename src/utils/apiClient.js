import axios from "axios";

const api = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

const apiClient = {
  get: (url, params = {}) => {
    return api.get(url);
  },
  post: (url, body = {}) => {
    return api.post(url, body);
  },
};

export default apiClient;
